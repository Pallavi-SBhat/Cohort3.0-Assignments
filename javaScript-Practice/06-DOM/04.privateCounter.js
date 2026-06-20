function outer() {
  let counter = 0;
  return function inner() {
    return counter++;
  };
}
 
let counter=outer()
console.log(counter());
console.log(counter());
console.log(counter());

