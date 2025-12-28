SELECT
    mi.id,
    mi.name,
    mi.target_food_cost,
    COALESCE(
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'ingredient_id', i.id,
                'ingredient_name', i.name,
                'quantity', mci.quantity,
                'unit', mci.unit
            )),'[]'::JSONB) AS ingredient_components,
    COALESCE(
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'recipe_id', r.id,
                'recipe_name', r.name,
                'quantity', mcr.quantity,
                'unit', mcr.unit
            )),'[]'::JSONB) AS recipe_components
FROM menu_item mi
LEFT JOIN menu_item_component mci ON mi.id = mci.menu_item_id AND mci.component_type = 'ingredient'
LEFT JOIN ingredient i ON mci.ingredient_id = i.id
LEFT JOIN menu_item_component mcr ON mi.id = mcr.menu_item_id AND mcr.component_type = 'recipe'
LEFT JOIN recipe r ON mcr.recipe_id = r.id
-- WHERE ${menuItemId} IS NULL OR mi.id = ${menuItemId}
GROUP BY mi.id, mi.name, mi.target_food_cost
;