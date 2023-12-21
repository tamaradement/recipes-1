# Recipes-1

## Introduction
- This project presents a scalable PostgreSQL database schema designed for a recipe and grocery list application. It's a backend solution for managing culinary recipes and simplifying grocery shopping experiences. The schema is structured to handle complex relationships inherent in recipe management and grocery list creation, making it a good starting point for developers looking to build a comprehensive recipe and grocery list management system where recipe data can be handled in a dynamic way.
---
## Key Features
- *Postgres Schema:* The heart of the project is a PostgreSQL schema design that includes tables for Recipes and Ingredients, along with a join table to establish their many-to-many relationship. Additionally, it features a ShoppingList table and ShoppingListItems table, which further extend the many-to-many relationship between shopping lists and recipe ingredients.

- *List Aggregation Script:* A key highlight of this project is a Node.js script designed to dynamically print shopping lists. This script consolidates similar items by summing their quantities, addressing an issue when combining items from multiple recipes. For instance, if a shopping list includes items from two different recipes, this might result in duplicate entries for the same ingredient, such as sugar listed as 150 grams and 50 grams. The script groups these into a single entry (sugar at 200 grams). This functionality highlights a key schema design choice; to store ingredient quantities within the join table between recipes and ingredients. 

---
## Prerequisites
- Node.js and npm installed (link to Node.js download page)
- PostgreSQL installed and running (link to PostgreSQL download page)
- A PostgreSQL database created for the project (e.g., `recipes-1`)

## Setup

### Database Setup

1. **Create Database**: 
   - Make sure PostgreSQL is running.
   - Create a new database.

2. **Create Tables**:
   - Open the SQL script for creating tables (e.g., `create-schema.sql`).
   - Run the script in your PostgreSQL database to create the tables. This can be done via a PostgreSQL GUI tool or using the `psql` command-line tool.

### Application Setup


1. **Clone the Repository** 
   
   First, copy the repository URL: `https://github.com/tamaradement/recipes-1`.

   Then, clone the repository using the command:

   ```bash
   git clone https://github.com/tamaradement/recipes-1
   ```
   
2. **Navigate to the Project Directory**:
   ```bash
   cd path/to/project
   ```

3. **Install Dependencies**:
   - Make sure you are in the project directory which contains `package.json`.
   - Run:
     ```bash
     npm install
     ```

4. **Environment Variables**:
   - Create a `.env` file in the root of your project.
   - Add the required environment variables (as detailed in the `database.js` section of the README).

## Running the Project

### Running the SQL Queries

- Use your preferred method to run SQL queries in the PostgreSQL database. This could be through a GUI tool or the `psql` command-line interface.

### Running the Node.js Script

- To print shopping list items for a specific list, run the following command in the terminal, replacing `[listId]` with the actual ID of the list:
  ```bash
  node printShoppingList.js [listId]
  ```

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
- The `ShoppingListItems` table serves as a junction table, linking `ShoppingList` with `RecipeIngredients`, which enables the creation of shopping lists based on the ingredients required for selected recipes.


