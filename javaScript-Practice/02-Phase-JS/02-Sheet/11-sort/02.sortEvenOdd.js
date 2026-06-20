let arr = [78, 24, 89, 13, 6, 3, 2, 1];
arr.sort((a, b) => {
  if (a % 2 === b % 2) return a - b;
  return a % 2 === 0 ? -1 : 1;
});
console.log(arr);