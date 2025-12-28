CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE unit_measurement AS ENUM (
    'weight',
    'volume',
    'count'
);

CREATE TYPE unit_type AS ENUM (
    -- weight
    'lb',
    'oz',
    -- volume
    'fl_oz',
    'gal',
    'qt',
    'pt',
    'cup',
    'tbsp',
    'tsp',
    'ml',
    'l',
    -- count
    'ea'
);

CREATE TYPE ingredient_category AS ENUM (
    'bread',
    'dairy',
    'grocery',
    'meat',
    'produce',
    'other',
    'recipe',
    'spice'
);

CREATE TYPE recipe_type AS ENUM (
    'ingredient',
    'recipe'
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category ingredient_category NOT NULL,
    default_measurement_unit unit_measurement NOT NULL,
    created_by INT NOT NULL REFERENCES user_profile(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredient_density (
    ingredient_id INT,
    oz_to_fl_oz NUMERIC NOT NULL,
    oz_to_tbsp NUMERIC NOT NULL,
    oz_to_cup NUMERIC NOT NULL
);

CREATE TABLE ingredient_purchase (
    id SERIAL PRIMARY KEY,
    ingredient_id INT NOT NULL REFERENCES ingredient(id),
    vendor TEXT,
    vendor_item_number TEXT,
    price NUMERIC NOT NULL,
    purchase_unit unit_type NOT NULL,
    purchase_quantity NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    yield_quantity NUMERIC NOT NULL,
    yield_unit unit_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE recipe_component_type AS ENUM (
    'ingredient',
    'recipe'
);

CREATE TABLE recipe_component (
    id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL REFERENCES recipe(id) ON DELETE CASCADE,
    ingredient_id INT REFERENCES ingredient(id) ON DELETE CASCADE,
    child_recipe_id INT REFERENCES recipe(id) ON DELETE CASCADE,
    component_type recipe_component_type NOT NULL,
    quantity NUMERIC NOT NULL,
    unit unit_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (
    (component_type = 'ingredient' AND ingredient_id IS NOT NULL AND child_recipe_id IS NULL)
    OR (component_type = 'recipe' AND child_recipe_id IS NOT NULL AND ingredient_id IS NULL))
);

CREATE TABLE menu_item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    target_food_cost NUMERIC NOT NULL,
    created_by INT NOT NULL REFERENCES user_profile(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE menu_item_component_type AS ENUM (
    'ingredient',
    'recipe'
);

CREATE TABLE menu_item_component (
    id SERIAL PRIMARY KEY,
    menu_item_id INT REFERENCES menu_item(id),
    component_type menu_item_component_type NOT NULL,
    ingredient_id INT REFERENCES ingredient(id),
    recipe_id INT REFERENCES recipe(id),
    quantity NUMERIC NOT NULL,
    unit unit_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    CONSTRAINT one_component_type CHECK (
        (ingredient_id IS NOT NULL AND recipe_id IS NULL) OR
        (ingredient_id IS NULL AND recipe_id IS NOT NULL)
    )
);

CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_by INT NOT NULL REFERENCES user_profile(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_item_menu (
    menu_id INT REFERENCES menu(id),
    menu_item_id INT REFERENCES menu_item(id),
    PRIMARY KEY (menu_id, menu_item_id)
);