import pool from './database.js'; 

const listId = process.argv[2]; 

if (!listId) {
  console.error('Please provide a list ID.');
  process.exit(1);
}

const query = `
SELECT i.name, SUM(ri.quantity) AS total_quantity, ri.quantity_unit
FROM ShoppingListItems sli
JOIN RecipeIngredients ri ON sli.recipe_id = ri.recipe_id AND sli.ingredient_id = ri.ingredient_id
JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
WHERE sli.list_id = $1
GROUP BY i.name, ri.quantity_unit
ORDER BY i.name;
`;

pool.query(query, [listId], (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("List:");
  res.rows.forEach(row => {
    console.log(`- ${row.name}, ${row.total_quantity} ${row.quantity_unit}`);
  });

  pool.end();
});
