SELECT
    pr.id,
    pr.name,
    -- pr.type,
    pr.yield_oz,
    pr.created_at,
    pr.updated_at,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'ingredient_id', pri.ingredient_id,
            'quantity', pri.quantity,
            'unit', pri.unit,
            'ingredient_name', i.name
        )
    ) AS ingredients
FROM prep_recipe pr
LEFT JOIN prep_recipe_ingredient pri ON pr.id = pri.prep_recipe_id
LEFT JOIN ingredient i ON pri.ingredient_id = i.id
WHERE pr.id = ${id}
GROUP BY pr.id;
;