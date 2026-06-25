function sum(...nums) {
  return nums.reduce((acc, curr) => acc + curr);
}

console.log(sum(1,2,3,4));