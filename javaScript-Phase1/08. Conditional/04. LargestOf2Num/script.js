let a = Number(prompt("Enter the number"));
let b = Number(prompt("Enter the number"));
if (a > b) {
  console.log(`${a} is greater than ${b}`);
} else if (b > a) {
  console.log(`${b} is greater than ${a}`);
} else {
  console.log(`${a} is equal to ${b}`);
}