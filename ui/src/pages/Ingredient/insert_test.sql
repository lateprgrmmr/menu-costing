INSERT INTO ingredient (name, category, default_measurement_unit, created_by) VALUES 
('Lime Juice', 'produce', 'volume', 1),
('Lemon Juice', 'produce', 'volume', 1),
('Lemon Zest', 'produce', 'volume', 1),
('Minced Garlic', 'produce', 'volume', 1)
;

INSERT INTO ingredient_purchase (ingredient_id, vendor, vendor_item_number, price, purchase_unit, purchase_quantity) VALUES (3, 'Whole Foods', '1234567890', 10.00, 'ea', 1);

INSERT INTO menu_item (name, target_food_cost, created_by) VALUES ('Test Menu Item', 0.25, 1);
INSERT INTO menu_item (name, target_food_cost, created_by) VALUES ('Cheeseburger', 0.25, 1);
INSERT INTO menu_item_component (menu_item_id, component_type, ingredient_id, quantity, unit) VALUES 
(1, 'ingredient', 3, 1, 'ea'),
(1, 'ingredient', 35, 1, 'ea'),
(1, 'recipe', 8, 1, 'ea'),
(1, 'ingredient', 11, 1, 'ea'),
(1, 'recipe', 16, 1, 'ea'),
(1, 'ingredient', 42, 1, 'ea'),
(1, 'ingredient', 48, 1, 'ea'),
(1, 'ingredient', 45, 1, 'ea'),
(1, 'ingredient', 26, 1, 'ea');