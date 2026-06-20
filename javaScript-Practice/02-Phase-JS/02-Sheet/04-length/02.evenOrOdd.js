const evenOrOdd = (n) => {
  return (n & 1) == 0 ? "Even" : "odd";
};
let arr=[1,2,3]
let eo=evenOrOdd(arr.length)
console.log("Length is ",eo);