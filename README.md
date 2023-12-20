# Recipes-1

## Introduction
This document outlines the schema of the PostgreSQL database used for the `recipes-1` project. It includes details of the tables, their columns, data types, and a brief description of each.

---

## Tables

### 1. Recipes Table

#### Description
Stores information about `Recipes`.

#### Columns
- `recipe_id`: SERIAL PRIMARY KEY
  - The unique identifier for each recipe.
- `recipe_name`: VARCHAR(255) NOT NULL
  - The name of the recipe.
- `description`: TEXT
  - Description or notes about the recipe.
- `creation_date`: DATE
  - Date the recipe was created.
- `last_updated`: TIMESTAMP (current date/time by default)
  - Date/Time the recipe was last updated.

---

### 2. Ingredients Table

#### Description
The `Ingredients` table stores information about the ingredients used in recipes.

#### Columns
- `ingredient_id`: SERIAL PRIMARY KEY
  - The unique identifier for each ingredient.
- `name`: VARCHAR(255) NOT NULL
  - The name of the ingredient.
- `type`: VARCHAR(100)
  - The category or type of the ingredient (e.g., Baking, Spices).
- `storage_instructions`: TEXT
  - Instructions for storing the ingredient.

---

### 3. RecipeIngredients Table (Junction Table for Many-to-Many Relationship)

#### Description
Associates recipes with ingredients, representing a many-to-many relationship.

#### Columns
- `recipe_id`: INT, FOREIGN KEY
  - References `Recipes`.
- `ingredient_id`: INT, FOREIGN KEY
  - References `Ingredients`.
- `quantity`: INT
  - Quantity of the ingredient used in the recipe.
- `quantity_unit`: VARCHAR(50)
  - Unit of measure for the quantity (e.g., grams, cups).

---

### 4. ShoppingList Table

#### Description
Stores information about shopping lists.

#### Columns
- `list_id`: SERIAL PRIMARY KEY
  - The unique identifier for each shopping list.
- `created`: TIMESTAMP (current date/time by default)
  - The timestamp when the shopping list was created.
- `lastUpdated`: TIMESTAMP (current date/time by default)
  - The timestamp when the shopping list was last updated.

---

### 5. ShoppingListItems Table (Join Table for Shopping List)

#### Description
Associates shopping lists with specific recipe ingredients, facilitating the creation of shopping lists based on recipes.

#### Columns
- `list_id`: INT, FOREIGN KEY
  - References `ShoppingList`. Identifies which shopping list the item belongs to.
- `recipe_id`: INT, FOREIGN KEY
  - References `Recipes`. Identifies the recipe associated with the shopping list item.
- `ingredient_id`: INT, FOREIGN KEY
  - References `Ingredients`. Identifies the specific ingredient in the recipe.

---

## Relationships

### Recipes and Ingredients (Many-to-Many)
- A `Recipe` can have many `Ingredients`.
- An `Ingredient` can be used in many `Recipes`.
- The `RecipeIngredients` table serves as a junction table to implement this many-to-many relationship.

### Shopping List and RecipeIngredients (Many-to-Many)
- A `ShoppingList` can contain multiple `RecipeIngredients`.
- The `ShoppingListItems` table serves as a junction table, linking `ShoppingList` with `RecipeIngredients`, thereby enabling the creation of shopping lists based on the ingredients required for selected recipes.

---

