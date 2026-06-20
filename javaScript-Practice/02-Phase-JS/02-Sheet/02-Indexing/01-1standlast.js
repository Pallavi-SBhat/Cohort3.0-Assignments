const prompt = require("prompt-sync")();

let n = Number(prompt("Enter the number of element"));
let arr = [];
for (let i = 0; i < n; i++) {
  arr[i] = prompt(`element ${i} `);
}
console.log("First element ", arr[0]);
console.log("Last element ", arr[arr.length - 1]);