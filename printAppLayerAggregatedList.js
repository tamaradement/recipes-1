import pool from './database.js'; 

const listId = process.argv[2]; 

if (!listId) {
  console.error('Please provide a list ID.');
  process.exit(1);
}

const query = `
  SELECT i.name, ri.quantity, ri.quantity_unit
  FROM ShoppingListItems sli
  JOIN RecipeIngredients ri ON sli.recipe_id = ri.recipe_id AND sli.ingredient_id = ri.ingredient_id
  JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
  WHERE sli.list_id = $1
  ORDER BY i.name;
`;

pool.query(query, [listId], (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  const combinedItems = {};
  res.rows.forEach(row => {
    const key = row.name + row.quantity_unit;
    if (combinedItems[key]) {
      combinedItems[key].total_quantity += row.quantity;
    } else {
      combinedItems[key] = { name: row.name, total_quantity: row.quantity, quantity_unit: row.quantity_unit };
    }
  });

  console.log("List:");
  Object.values(combinedItems).forEach(item => {
    console.log(`- ${item.name}, ${item.total_quantity} ${item.quantity_unit}`);
  });

  pool.end();
});
