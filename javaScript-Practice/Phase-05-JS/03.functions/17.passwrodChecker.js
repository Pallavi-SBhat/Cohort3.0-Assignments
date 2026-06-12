function makeMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}
let double=makeMultiplier(2)
console.log(double(10));
let triple=makeMultiplier(3)
console.log(triple(10));