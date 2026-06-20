let students = [
  { name: "Ritik", present: true },
  { name: "Aman", present: false },
  { name: "Priya", present: true },
];

function countPresent(students) {
  let presentStudent = students.filter((student) => student.present === true);
  return presentStudent.length;
}
function countAbsent(students) {
  let absentStudent = students.filter((student) => student.present === true);
  return absentStudent.length;
}
function getPresentStudents() {
  return students.filter((student) => student.present === true);
}

console.log("Present Students", countPresent(students));
console.log("Absent Students", countAbsent(students));
console.log("Students who are Present", getPresentStudents(students));