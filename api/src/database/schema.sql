CREATE TYPE unit_type AS ENUM (
    'lb',
    'oz',
    'fl oz',
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

CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category ingredient_category NOT NULL,
    vendor VARCHAR(255),
    purchase_unit unit_type NOT NULL,
    purchase_quantity NUMERIC NOT NULL,
    purchase_cost NUMERIC NOT NULL,
    cost_per_oz NUMERIC NOT NULL,
    created_by INT NOT NULL REFERENCES user_profile(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE unit_conversion (
    ingredient_id INT,
    oz_to_tbsp NUMERIC NOT NULL
);

CREATE TYPE recipe_type AS ENUM (
    'ingredient',
    'prep_recipe'
);

CREATE TABLE prep_recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    -- type recipe_type NOT NULL,
    yield_oz  NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prep_recipe_ingredient (
    id SERIAL PRIMARY KEY,
    prep_recipe_id INT,
    ingredient_id INT,
    quantity NUMERIC NOT NULL,
    unit unit_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    'prep_recipe'
);

CREATE TABLE menu_item_component (
    id SERIAL PRIMARY KEY,
    menu_item_id INT REFERENCES menu_item(id),
    component_type menu_item_component_type NOT NULL,
    ingredient_id INT,
    prep_recipe_id INT,
    quantity NUMERIC NOT NULL,
    unit unit_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    CONSTRAINT one_component_type CHECK (
        (ingredient_id IS NOT NULL AND prep_recipe_id IS NULL) OR
        (ingredient_id IS NULL AND prep_recipe_id IS NOT NULL)
    )
)