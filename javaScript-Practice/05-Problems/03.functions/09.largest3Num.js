function findLargest(a, b, c) {
  if (a > b && a > c) return a;
  if (b > c) return b;
  return c;
}

console.log(findLargest(10,50,20));