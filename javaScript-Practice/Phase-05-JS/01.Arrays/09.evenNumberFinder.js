let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
function findEven(arr) {
  return arr.filter((x) => (x & 1) == 0);
}

console.log(findEven(numbers));