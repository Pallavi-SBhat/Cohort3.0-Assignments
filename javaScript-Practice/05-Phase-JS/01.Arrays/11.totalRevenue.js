let sales = [500, 700, 1000, 300];
function total(arr) {
  return arr.reduce((acc, curr) => acc + curr);
}
console.log(total(sales));