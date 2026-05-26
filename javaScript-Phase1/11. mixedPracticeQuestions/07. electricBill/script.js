let units = Number(prompt("Enter the units consumed "));
let totalAmount = 0;
if (units <= 100) {
  totalAmount = units * 5;
} else if (units <= 300) {
  totalAmount = 100 * 5 + (units - 100) * 7;
} else {
  totalAmount = 100 * 5 + 200 * 7 + (units - 300) * 10;
}
console.log("Current bill ", totalAmount);