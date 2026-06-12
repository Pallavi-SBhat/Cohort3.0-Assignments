let students = [
  { name: "Ritik", marks: 80 },
  { name: "Aman", marks: 90 },
  { name: "Priya", marks: 70 },
];

function getTotalMarks(students) {
  let total = students.reduce((acc, curr) => {
    return acc + curr.marks;
  }, 0);
  return total;
}

console.log(getTotalMarks(students));