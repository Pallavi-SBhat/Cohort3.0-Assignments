const products = [
  {
    name: "Logitec",
    price: 500,
    category: "Keyboards",
  },
  {
    name: "Dell",
    price: 900,
    category: "Keyboards",
  },
  {
    name: "HP",
    price: 55000,
    category: "Laptops",
  },
  {
    name: "ASUS",
    price: 55000,
    category: "Laptops",
  },
  {
    name: "Nike",
    price: 55000,
    category: "Shoes",
  },
];

const onlyNames = products.map((e) => e.name);
const laptopCategory = products.filter(
  (e) => e.category.toLowerCase() === "laptops",
);
const totalPrice = products.reduce((acc, high) => acc + high.price, 0);
console.log(onlyNames);
console.log(laptopCategory);
console.log(totalPrice);