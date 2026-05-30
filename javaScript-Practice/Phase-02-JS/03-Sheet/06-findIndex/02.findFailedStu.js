let students = [
  { name: "A", marks: 90 },
  { name: "B", marks: 30 },
  { name: "C", marks: 70 },
];

let failedStudent = students.findIndex((e) => e.marks < 40);
console.log(failedStudent);