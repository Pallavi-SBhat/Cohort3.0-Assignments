let products = [
  { name: "Laptop", price: 50000 },
  { name: "Phone", price: 30000 },
  { name: "Mouse", price: 500 },
];
function countPremiumProducts(products) {
  return products.filter((p) => p.price >= 10000).length;
}
console.log(countPremiumProducts(products));