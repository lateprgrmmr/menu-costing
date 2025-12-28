SELECT
    r.id,
    r.name,
    r.yield_quantity,
    r.yield_unit,
    COALESCE(
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'id', i.id,
                'name', i.name,
                'quantity', rc.quantity,
                'unit', rc.unit)
            ) FILTER (WHERE i.id IS NOT NULL),'[]'::jsonb) AS ingredient_components,
    COALESCE(
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'id', r2.id,
                'name', r2.name,
                'quantity', rc.quantity,
                'unit', rc.unit)
            ) FILTER (WHERE rc.child_recipe_id IS NOT NULL),'[]'::jsonb) AS recipe_components
FROM recipe r
LEFT JOIN recipe_component rc ON r.id = rc.recipe_id
LEFT JOIN ingredient i ON rc.ingredient_id = i.id
LEFT JOIN recipe r2 ON rc.child_recipe_id = r2.id
WHERE ${recipeId} IS NULL OR r.id = ${recipeId}
GROUP BY r.id, r.name, r.yield_quantity, r.yield_unit
;