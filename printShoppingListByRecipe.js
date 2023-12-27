import pool from './database.js'; 

const listId = process.argv[2]; 

if (!listId) {
  console.error('Please provide a list ID.');
  process.exit(1);
}

const query = `
SELECT r.recipe_name, i.name AS ingredient_name, ri.quantity, ri.quantity_unit
FROM ShoppingListItems sli
JOIN RecipeIngredients ri ON sli.recipe_id = ri.recipe_id AND sli.ingredient_id = ri.ingredient_id
JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
JOIN Recipes r ON ri.recipe_id = r.recipe_id
WHERE sli.list_id = $1
ORDER BY r.recipe_name, i.name;
`;

pool.query(query, [listId], (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  const recipes = {};
  res.rows.forEach(row => {
    if (!recipes[row.recipe_name]) {
      recipes[row.recipe_name] = [];
    }
    recipes[row.recipe_name].push(`${row.ingredient_name}, ${row.quantity} ${row.quantity_unit}`);
  });

  console.log("List:");
  for (const [recipe, ingredients] of Object.entries(recipes)) {
    console.log(`- ${recipe}`);
    ingredients.forEach(ingredient => {
      console.log(`  - ${ingredient}`);
    });
  }

  pool.end();
});
