SELECT *
FROM ingredient
WHERE created_at > CURRENT_DATE - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 30
;