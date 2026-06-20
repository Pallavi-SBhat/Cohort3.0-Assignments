let nums = [5, 8, 10, 3];
function isPositive(arr) {
  return arr.every((x) => x >= 0);
}
console.log(isPositive(nums));