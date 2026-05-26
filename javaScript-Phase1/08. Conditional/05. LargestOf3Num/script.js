let a = Number(prompt("Enter the number 1"));
let b = Number(prompt("Enter the number 2"));
let c = Number(prompt("Enter the number 3"));
if (a == b && a == c) {
  console.log("All three number are equal");
} else if (a > b && a > c) {
  console.log(`${a} is greater than ${b} and ${c}`);
} else if (b > c) {
  console.log(`${b} is greater than ${a} and ${c}`);
} else {
  console.log(`${c} is greater than ${a} and ${b}`);
}