let total = 0;
for (let i = 0; i < 5; i++) {
  let sub = Number(prompt(`Subject ${i + 1}`));
  total += sub;
}
console.log("Total marks ", total);
let percentage = (total / 500) * 100;
console.log("Percentage ", percentage);