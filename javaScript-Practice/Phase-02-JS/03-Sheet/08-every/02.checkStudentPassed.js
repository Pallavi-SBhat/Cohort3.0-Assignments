let students = [
  { name: "A", marks: 80 },
  { name: "B", marks: 45 },
  { name: "C", marks: 60 },
];
let isPassed=students.every((e)=>e.marks>=40)
console.log(isPassed);