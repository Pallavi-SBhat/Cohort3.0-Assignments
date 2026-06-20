let products = [
  { name: "Laptop", stock: 5 },
  { name: "Phone", stock: 0 },
];
let isProductIsOutOfStock = products.some((e) => e.stock == 0);

console.log(isProductIsOutOfStock);