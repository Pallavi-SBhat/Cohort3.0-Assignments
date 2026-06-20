let arr = [10, 20, 30, 40, 50];
console.log("Before Swapping");

console.log(arr);
let temp = arr[1];
arr[1] = arr[arr.length - 2];
arr[arr.length - 2] = temp;
console.log("After swapping");

console.log(arr);