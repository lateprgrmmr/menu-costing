SELECT
    rc.recipe_id,
    rc.ingredient_id,
    rc.quantity,
    rc.unit,
    CASE
        WHEN rc.unit = 'tbsp' THEN rc.quantity * COALESCE(d.oz_to_tbsp, 0.36)
        WHEN rc.unit = 'tsp' THEN (rc.quantity / 3) * COALESCE(d.oz_to_tbsp, 0.36)
        WHEN rc.unit = 'cup' THEN (rc.quantity * 32) * COALESCE(d.oz_to_tbsp, 0.36) -- assume oz
    END AS oz_quantity,
    (ip.price / ip.purchase_quantity) AS price_per_oz, -- again, assume oz
    ROUND((CASE
        WHEN rc.unit = 'tbsp' THEN rc.quantity * COALESCE(d.oz_to_tbsp, 0.36)
        WHEN rc.unit = 'tsp' THEN (rc.quantity / 3) * COALESCE(d.oz_to_tbsp, 0.36)
        WHEN rc.unit = 'cup' THEN (rc.quantity * 32) * COALESCE(d.oz_to_tbsp, 0.36) -- assume oz
        ELSE rc.quantity
    END) * (ip.price / ip.purchase_quantity), 4) AS component_cost
FROM recipe_component rc
LEFT JOIN ingredient_density d ON rc.ingredient_id = d.ingredient_id
LEFT JOIN ingredient_purchase ip ON rc.ingredient_id = ip.ingredient_id
WHERE rc.recipe_id = 7
;