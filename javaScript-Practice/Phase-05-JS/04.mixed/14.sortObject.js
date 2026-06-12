let unsorted = [
  { name: "A", marks: 70 },
  { name: "B", marks: 95 },
  { name: "C", marks: 80 },
];
function sortByMarks(unsorted) {
  return unsorted.sort((a, b) => b.marks - a.marks);
}
console.log(sortByMarks(unsorted));