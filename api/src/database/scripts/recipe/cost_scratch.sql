SELECT
    r.id,
    i.name,
    rc.quantity,
    rc.unit
FROM recipe r
LEFT JOIN recipe_component rc ON r.id = rc.recipe_id
LEFT JOIN ingredient i ON rc.ingredient_id = i.id
WHERE r.id = 1
;

SELECT
    i.id,
    i.name,
    ip.price,
    ip.purchase_unit,
    ip.purchase_quantity
FROM recipe r
LEFT JOIN recipe_component rc ON r.id = rc.recipe_id
LEFT JOIN ingredient i ON rc.ingredient_id = i.id
LEFT JOIN ingredient_purchase ip ON i.id = ip.ingredient_id
WHERE r.id = 1
;