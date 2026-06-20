let students = [
  {
    name: "Hithesh",
    department: "MCA",
  },
  {
    name: "Pallavi",
    department: "MCA",
  },
  {
    name: "Aman",
    department: "BE",
  },
];
function addStudent(students, student) {
  students.push(student);
  return students;
}
let student = {
  name: "Naman",
  department: "BE",
};

console.log(addStudent(students,student));