let students = [
  {
    name: "Ritik",
    marks: [80, 90, 85],
  },
  {
    name: "Aman",
    marks: [50, 40, 60],
  },
];

function generateReport(students) {
  return students.map((student) => {
    let total = student.marks.reduce((acc, curr) => acc + curr, 0);
    let avg = total / student.marks.length;

    let grade = "";
    if (avg >= 85) grade = "A";
    else if (avg >= 70) grade = "B";
    else if (avg >= 50) grade = "C";
    else grade = "Fail";
    return {
      name: student.name,
      average: avg,
      grade: grade,
    };
  });
}

console.log(generateReport(students));