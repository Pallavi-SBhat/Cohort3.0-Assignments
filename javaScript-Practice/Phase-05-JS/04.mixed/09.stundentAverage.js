let students = [
  { name: "Ritik", marks: [80, 90, 85] },
  { name: "Aman", marks: [70, 75, 80] },
];

function getAverageMarks(students) {
  return students.map((student) => {
    let totalMarks = student.marks.reduce((acc, high) => acc + high,0);
    let avg = totalMarks / student.marks.length;
    return {
      name: student.name,
      total: totalMarks,
      average: avg,
    };
  });
}
console.log(getAverageMarks(students));
