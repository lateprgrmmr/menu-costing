SELECT *
FROM ingredient
WHERE created_at > CURRENT_DATE - INTERVAL '30 days'
;