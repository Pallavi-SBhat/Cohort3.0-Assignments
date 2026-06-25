let bill = [
  { name: "Mouse", price: 500 },
  { name: "Keyboard", price: 1000 },
  { name: "Monitor", price: 10000 },
];

function generateBill(items) {
  let total = items.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  return `Total: ${total}`;
}
console.log(generateBill(bill));