-- Creating the Recipes Table
CREATE TABLE Recipes (
    recipe_id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    description TEXT,
    creation_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the Ingredients Table
CREATE TABLE Ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    storage_instructions TEXT,
);

-- Creating the RecipeIngredients Table (Join Table)
CREATE TABLE RecipeIngredients (
    recipe_id INT,
    ingredient_id INT,
    quantity INT,
    quantity_unit, VARCHAR(50)
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id) ON DELETE CASCADE
);


-- Creating the Shopping List Table
CREATE TABLE ShoppingList (
    list_id SERIAL PRIMARY KEY,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Creating the ShoppingListItems Table (Join Table)
CREATE TABLE ShoppingListItems (
    list_id INT,
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (list_id, recipe_id, ingredient_id),
    FOREIGN KEY (list_id) REFERENCES ShoppingList(list_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id, ingredient_id) REFERENCES RecipeIngredients(recipe_id, ingredient_id) ON DELETE CASCADE
);

-- Creating the ShoppingList
CREATE TABLE ShoppingListItems (
    list_id INT,
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (list_id, recipe_id, ingredient_id),
    FOREIGN KEY (list_id) REFERENCES ShoppingList(list_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id, ingredient_id) REFERENCES RecipeIngredients(recipe_id, ingredient_id) ON DELETE CASCADE
);

