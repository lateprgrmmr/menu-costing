SELECT
    i.id,
    i.name,
    i.category,
    i.default_measurement_unit,
    i.created_by,
    i.created_at,
    i.updated_at,
    id.oz_to_fl_oz,
    id.oz_to_tbsp,
    id.oz_to_cup,
    COALESCE(
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
            'price', ip.price,
            'purchase_unit', ip.purchase_unit,
            'purchase_quantity', ip.purchase_quantity,
            'vendor', ip.vendor,
            'vendor_item_number', ip.vendor_item_number,
            'purchase_date', ip.created_at)
        ) FILTER (WHERE ip.ingredient_id IS NOT NULL), '[]'::jsonb) as purchases,
    COALESCE(
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
            'recipe_id', rc.recipe_id,
            'recipe_name', r.name,
            'quantity', rc.quantity,
            'unit', rc.unit)
        ) FILTER (WHERE rc.recipe_id IS NOT NULL), '[]'::jsonb) as recipes
FROM ingredient i
LEFT JOIN ingredient_density id ON i.id = id.ingredient_id
LEFT JOIN ingredient_purchase ip ON i.id = ip.ingredient_id
LEFT JOIN recipe_component rc ON i.id = rc.ingredient_id
LEFT JOIN recipe r ON rc.recipe_id = r.id
WHERE i.id = ${ingredientId}
GROUP BY i.id, id.oz_to_fl_oz, id.oz_to_tbsp, id.oz_to_cup, ip.price, ip.purchase_unit, ip.purchase_quantity;