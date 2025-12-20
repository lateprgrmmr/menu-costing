import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, TextField } from "@mui/material";
import type { IngredientInsertOrUpdateRequest, IngredientRecord } from "../../shared/types/ingredient";
import { useEffect, useState } from "react";
import { IngredientCategoryEnum, IngredientCategoryValueLookup, UnitTypeEnum } from "../../shared/types/common";
import { styles } from "../../styles/EditOrCreateIngredient.styles";
import { createIngredient, updateIngredient } from "../../actions/Ingredient.action";


interface EditOrCreateIngredientDialogProps {
    open: boolean;
    onClose: () => void;
    existingIngredient?: IngredientRecord;
}

export const EditOrCreateIngredientDialog = (props: EditOrCreateIngredientDialogProps) => {
    const { open, onClose, existingIngredient } = props;
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<IngredientCategoryEnum | null>(null);
    const [vendor, setVendor] = useState<string>("");
    const [purchaseUnit, setPurchaseUnit] = useState<UnitTypeEnum>(UnitTypeEnum.OZ);
    const [purchaseQuantity, setPurchaseQuantity] = useState<number>(0);
    const [purchaseCost, setPurchaseCost] = useState<number>(0);
    const [costPerOz, setCostPerOz] = useState<number>(0);
    const [isExisting, setIsExisting] = useState<boolean>(false);

    useEffect(() => {
        if (existingIngredient) {
            setName(existingIngredient.name);
            setCategory(existingIngredient.category as IngredientCategoryEnum);
            setVendor(existingIngredient.vendor);
            setPurchaseUnit(existingIngredient.purchase_unit as UnitTypeEnum);
            setPurchaseQuantity(existingIngredient.purchase_quantity);
            setPurchaseCost(existingIngredient.purchase_cost);
            setCostPerOz(existingIngredient.cost_per_oz);
        }
        setIsExisting(existingIngredient !== undefined);
    }, [existingIngredient]);

    const handleClose = () => {
        setName("");
        setCategory(null);
        setVendor("");
        setPurchaseUnit(UnitTypeEnum.OZ);
        setPurchaseQuantity(0);
        setPurchaseCost(0);
        setCostPerOz(0);
        onClose();
    }

    const handleSave = async () => {
        console.log("validateForm", validateForm());
        console.log("isExisting", isExisting);
        if (!validateForm()) {
            return;
        }
        if (isExisting && existingIngredient) {
            const updatedIngredient: IngredientInsertOrUpdateRequest = {
                name: name,
                category: category,
                vendor: vendor,
                purchase_unit: purchaseUnit,
                purchase_quantity: purchaseQuantity,
                purchase_cost: purchaseCost,
                cost_per_oz: costPerOz,
                created_by: existingIngredient.created_by || 1 // TODO: get the user id from the auth context
            };
            await updateIngredient(existingIngredient.id, updatedIngredient);
        } else {
            const newIngredient: IngredientInsertOrUpdateRequest = {
                name: name,
                category: category,
                vendor: vendor,
                purchase_unit: purchaseUnit,
                purchase_quantity: purchaseQuantity,
                purchase_cost: purchaseCost,
                cost_per_oz: costPerOz,
                created_by: 1 // TODO: get the user id from the auth context
            };
            console.log("newIngredient", newIngredient);
            await createIngredient(newIngredient);
            handleClose();
        }
    };

    const validateForm = () => {
        return Boolean(
            name !== ""
            && vendor !== ""
            && category !== null
            && purchaseUnit !== null
            && purchaseQuantity > 0
            && purchaseCost > 0
            && (costPerOz > 0 || (purchaseCost > 0 && purchaseQuantity > 0)));
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.root}>
            <DialogTitle>{existingIngredient ? "Edit" : "Create"} Ingredient</DialogTitle>
            <DialogContent>
                <FormControl fullWidth error={!validateForm()} component="fieldset">
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={styles.textInput}
                        style={{ width: '100%' }}
                        required
                    />
                    <TextField
                        label="Vendor"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                        sx={styles.textInput}
                        style={{ width: '100%' }}
                        required
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Autocomplete
                            options={Object.values(IngredientCategoryEnum)}
                            getOptionLabel={(option) => IngredientCategoryValueLookup[option as IngredientCategoryEnum] || option}
                            value={category}
                            onChange={(_, value) => setCategory(value as IngredientCategoryEnum)}
                            renderInput={(params) => <TextField {...params} label="Category" required />}
                            sx={styles.autocomplete}
                            style={{ width: '45%' }}
                        />
                        <Autocomplete
                            options={Object.values(UnitTypeEnum)}
                            getOptionLabel={(option) => option}
                            value={purchaseUnit}
                            onChange={(_, value) => setPurchaseUnit(value as UnitTypeEnum)}
                            renderInput={(params) => <TextField {...params} label="Purchase Unit" required />}
                            sx={styles.textInput}
                            style={{ width: '45%' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <TextField
                            label="Purchase Quantity"
                            value={purchaseQuantity}
                            type="number"
                            onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
                            sx={styles.textInput}
                            required
                        />
                        <TextField
                            label="Purchase Cost"
                            value={purchaseCost}
                            type="number"
                            onChange={(e) => setPurchaseCost(Number(e.target.value))}
                            sx={styles.textInput}
                            required
                        />
                        <TextField
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }
                            }}
                            label="Cost Per Oz"
                            value={(purchaseCost / purchaseQuantity).toFixed(2)}
                            type="number"
                            onChange={(e) => setCostPerOz(Number(e.target.value))}
                            sx={styles.textInput}
                            required
                        />
                    </div>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}