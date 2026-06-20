let students = [
  { name: "Ritik", marks: 85 },
  { name: "Aman", marks: 95 },
  { name: "Priya", marks: 75 },
];

function highestScoringStudent(students) {
  //   let highest = 0,
  //     topper = {},
  //     name = "";
  //   for (let student of students) {
  //     if (highest < student.marks) {
  //       highest = student.marks;
  //       name = student.name;
  //     }
  //   }
  //   topper = { name, highest };
  //   return topper;

  let topStudent = students.reduce((previous, current) =>
    current.marks > previous.marks ? current : previous,
  );
  return topStudent;
}
console.log(highestScoringStudent(students));