let marks = {
  math: 90,
  science: 80,
  english: 85,
};
let total = Object.values(marks).reduce((acc, curr) => acc + curr);
marks.total = total;
console.log(marks);