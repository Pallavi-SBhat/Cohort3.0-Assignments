let inventory = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Monitor" },
];
function findProductById(inventory, id) {
  return inventory.find((i) => i.id == id);
}

console.log(findProductById(inventory, 1));