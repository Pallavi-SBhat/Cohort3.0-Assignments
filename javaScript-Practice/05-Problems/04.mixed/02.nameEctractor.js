let products = [
  { name: "Laptop", price: 50000 },
  { name: "Mouse", price: 500 },
];

function getProductName(products) {
  let names = products.map((product) => product.name);
  return names;
}
console.log(getProductName(products));