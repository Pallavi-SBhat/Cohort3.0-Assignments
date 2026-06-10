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
function averageMarks(students) {
  let avg = [];
  for (let i = 0; i < students.length; i++) {
    let total = students[i].marks.reduce((acc, value) => {
      return acc + value;
    }, 0);
    avg[i] = total / students[i].marks.length;
  }
  return avg
}

