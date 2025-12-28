import {
    Autocomplete,
    Box, Button, Dialog,
    DialogContent, IconButton,
    MenuItem, Paper, Select,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, TextField, Typography
} from "@mui/material";
import type {
    RecipeInsertOrUpdateRequest,
    RecipeUXRecord
} from "../../../shared/types/recipe";
import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import {
    createRecipe,
    deleteRecipeComponent,
    updateRecipe,
} from "../../../actions/Recipe.action";
import { UnitTypeEnum, UnitTypeValueLookup } from "../../../shared/types/common";
import { CircularProgress } from "@mui/material";
import useComponents from "../../../common/hooks/useComponents";
import type { ComponentRow } from "../../../shared/types/components";


interface CreateOrEditRecipeDialogProps {
    open: boolean;
    onClose: (updatedRecipe?: RecipeUXRecord) => void;
    existingRecipe?: RecipeUXRecord | null;
}

const createEmptyRow = (): ComponentRow => {
    return {
        id: crypto.randomUUID(),
        component: null,
        quantity: 0,
        unit: UnitTypeEnum.OZ,
    }
}

const CreateOrEditRecipeDialog = (props: CreateOrEditRecipeDialogProps) => {
    const { open, onClose, existingRecipe } = props;
    const { componentOptions } = useComponents();

    const [isLoading, setIsLoading] = useState(false);
    const [components, setComponents] = useState<ComponentRow[]>([]);

    const [recipeName, setRecipeName] = useState('');
    const [yieldQuantity, setYieldQuantity] = useState(0);
    const [yieldUnit, setYieldUnit] = useState<UnitTypeEnum>(UnitTypeEnum.EA);

    const title = existingRecipe ? `Edit ${existingRecipe.name}` : "Create Recipe";

    useEffect(() => {
        if (!componentOptions.length) {
            return;
        }
        setIsLoading(true);
        if (existingRecipe) {
            setRecipeName(existingRecipe.name);
            setYieldQuantity(Number(existingRecipe.yield_quantity));
            setYieldUnit(existingRecipe.yield_unit as UnitTypeEnum);

            // Convert ingredient_components to ComponentRow[]
            const ingredientRows: ComponentRow[] = (existingRecipe.ingredient_components || []).map(
                (comp) => ({
                    id: crypto.randomUUID(),
                    component: componentOptions.find(
                        (opt) => opt.type === 'ingredient' && opt.id === comp.id
                    ) || null,
                    quantity: Number(comp.quantity),
                    unit: comp.unit as UnitTypeEnum,
                })
            );

            // Convert recipe_components to ComponentRow[]
            const recipeRows: ComponentRow[] = (existingRecipe.recipe_components || []).map(
                (comp) => ({
                    id: crypto.randomUUID(),
                    component: componentOptions.find(
                        (opt) => opt.type === 'recipe' && opt.id === comp.id
                    ) || null,
                    quantity: Number(comp.quantity),
                    unit: comp.unit as UnitTypeEnum,
                })
            );

            // Merge both into a single array
            const allRows = [...ingredientRows, ...recipeRows];
            setComponents(allRows.length ? allRows : [createEmptyRow()]);
        }
        setIsLoading(false);
    }, [existingRecipe, componentOptions]);

    const handleAddIngredient = () => {
        setComponents((prev) => [...prev, createEmptyRow()]);
    };

    const handleClose = () => {
        onClose();
    }

    const handleSave = async () => {
        setIsLoading(true);

        // Convert ComponentRow[] to API format
        const componentsPayload = components
            .filter(c => c.component !== null)  // Skip empty rows
            .map((row) => ({
                recipe_id: existingRecipe?.id,
                component_type: row.component!.type,  // 'ingredient' | 'recipe'
                ingredient_id: row.component!.type === 'ingredient' ? row.component!.id : undefined,
                child_recipe_id: row.component!.type === 'recipe' ? row.component!.id : undefined,
                quantity: Number(row.quantity) || 0,
                unit: row.unit,
            }));

        const updates: RecipeInsertOrUpdateRequest = {
            recipe_id: existingRecipe?.id,
            name: recipeName,
            yield_quantity: yieldQuantity,
            yield_unit: yieldUnit,
            components: componentsPayload,
        };

        let response: RecipeUXRecord | null = null;
        if (existingRecipe) {
            response = await updateRecipe(existingRecipe.id, updates);
        } else {
            response = await createRecipe(updates);
        }

        if (response) {
            // Convert response back to ComponentRow[]
            const ingredientRows: ComponentRow[] = (response.ingredient_components || []).map((comp) => ({
                id: crypto.randomUUID(),
                component: componentOptions.find(
                    (opt) => opt.type === 'ingredient' && opt.id === comp.id
                ) || null,
                quantity: Number(comp.quantity),
                unit: comp.unit as UnitTypeEnum,
            }));

            const recipeRows: ComponentRow[] = (response.recipe_components || []).map((comp) => ({
                id: crypto.randomUUID(),
                component: componentOptions.find(
                    (opt) => opt.type === 'recipe' && opt.id === comp.id
                ) || null,
                quantity: Number(comp.quantity),
                unit: comp.unit as UnitTypeEnum,
            }));

            setComponents([...ingredientRows, ...recipeRows]);
            setRecipeName(response.name);
            setYieldQuantity(Number(response.yield_quantity));
            setYieldUnit(response.yield_unit as UnitTypeEnum);
        }

        onClose(response ?? undefined);
        setIsLoading(false);
    };

    const handleRemoveIngredient = async (component: ComponentRow) => {
        setComponents((prev) => {
            const filtered = prev.filter((c) => c.id !== component.id);
            return filtered.length ? filtered : [createEmptyRow()];
        });
        if (component.component) {
            await deleteRecipeComponent(component.component.id);
        }
    }

    const handleRowChange = (id: string, field: keyof ComponentRow, value: any) => {
        setComponents((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    console.log('componentOptions:', componentOptions.length);
    console.log('existingRecipe.ingredient_components:', existingRecipe?.ingredient_components);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
            <DialogContent sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <form onSubmit={handleSave}>
                    <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2, maxHeight: '70vh', overflowY: 'auto' }}>
                        <Box>
                            <Typography variant="h6">{title}</Typography>
                        </Box>
                        <Box>
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center" marginBottom={2}>
                                <Box>
                                    <TextField
                                        size="small"
                                        type="text"
                                        value={recipeName}
                                        onChange={(e) => setRecipeName(e.target.value)}
                                        placeholder="Enter recipe name"
                                        sx={{ minWidth: '500px' }}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={yieldQuantity}
                                        onChange={(e) => setYieldQuantity(e.target.value === "" ? 0 : Number(e.target.value) || 0)}
                                        placeholder="Enter yield quantity"
                                    />
                                </Box>
                                <Box>
                                    <Select
                                        size="small"
                                        value={yieldUnit}
                                        onChange={(e) => setYieldUnit(e.target.value as UnitTypeEnum)}
                                    >
                                        {Object.entries(UnitTypeValueLookup).map(([key, label]) => (
                                            <MenuItem key={key} value={key}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>
                        </Box>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ingredient</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Unit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {components.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3}>No ingredients added</TableCell>
                                    </TableRow>
                                )}
                                {components.map((component) => (
                                    <TableRow key={component.id}>
                                        <TableCell>
                                            <Autocomplete
                                                size="small"
                                                options={componentOptions}
                                                getOptionLabel={(option) => option.name}
                                                value={component.component}
                                                onChange={(_, newValue) =>
                                                    handleRowChange(component.id, "component", newValue)
                                                }
                                                isOptionEqualToValue={(option, value) =>
                                                    option.type === value.type && option.id === value.id
                                                }
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Select ingredient" />
                                                )}
                                                sx={{ minWidth: 200 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                size="small"
                                                type="number"
                                                value={component.quantity}
                                                onChange={(e) =>
                                                    handleRowChange(
                                                        component.id,
                                                        "quantity",
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                sx={{ width: 100 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                size="small"
                                                value={component.unit}
                                                onChange={(e) =>
                                                    handleRowChange(component.id, "unit", e.target.value as UnitTypeEnum)
                                                }
                                                sx={{ minWidth: 80 }}
                                            >
                                                {Object.entries(UnitTypeValueLookup).map(([key, label]) => (
                                                    <MenuItem key={key} value={key}>
                                                        {label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => handleRemoveIngredient(component)}
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Button variant="outlined" color="primary" onClick={handleAddIngredient}>Add Ingredient</Button>
                        <Button variant="outlined" color="primary" onClick={handleSave}>Save</Button>
                    </Box>
                </form >
            </DialogContent >
        </Dialog >
    )
}

export default CreateOrEditRecipeDialog;