let studentName = prompt("Enter the name of the student");

let maths = Number(prompt("Enter the marks scored in maths"));
let science = Number(prompt("Enter the marks scored in Science"));
let english = Number(prompt("Enter the marks scored in English"));

let total = maths + science + english;
let percentage = total / 3;

console.log("Student Name:", studentName);
console.log("Total Marks:", total);
console.log("Percentage:", percentage.toFixed(2) + "%");

if (percentage >= 90) {
  console.log("Grade: A+");
} else if (percentage >= 75) {
  console.log("Grade: A");
} else if (percentage >= 60) {
  console.log("Grade: B");
} else if (percentage >= 40) {
  console.log("Grade: C");
} else {
  console.log("Grade: Fail");
}