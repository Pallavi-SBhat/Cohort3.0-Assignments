let products = [
  { name: "Mouse", stock: 10 },
  { name: "Keyboard", stock: 0 },
  { name: "Monitor", stock: 5 },
];

function findAvailableProducts(products) {
  let available = products.filter((product) => product.stock > 0);
  return available;
}
console.log(findAvailableProducts(products));
