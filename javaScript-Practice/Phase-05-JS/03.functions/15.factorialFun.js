function factorial(n) {
  //   if (n == 1) return n;
  //   return n * factorial(n - 1);

  // using loops
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
  }
  return fact;
}
console.log(factorial(5));