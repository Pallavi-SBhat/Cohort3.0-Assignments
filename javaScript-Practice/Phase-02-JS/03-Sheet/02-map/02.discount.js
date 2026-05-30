let products = [
  { name: "Laptop", price: 50000 },
  { name: "Phone", price: 20000 },
];
let productsWithDiscount = products.map((e) => {
  return { ...e, discountPrice: e.price * 0.9 };
});

console.log(productsWithDiscount);