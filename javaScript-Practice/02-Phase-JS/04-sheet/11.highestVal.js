const marks = {
  Anubhav: 95,
  Rahul: 82,
  Aman: 90,
};

let topper = "";
let highestMarks = 0;
for (let student in marks) {
  if (marks[student] > highestMarks) {
    highestMarks = student[marks];
    topper = student;
  }
}
console.log(topper);

// using reduce
let toppers = Object.entries(marks).reduce((acc, highest) => {
  return acc[1] > highest[1] ? acc : highest;
});
console.log(toppers[0]);