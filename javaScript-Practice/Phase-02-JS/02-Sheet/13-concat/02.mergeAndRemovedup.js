let arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
let arr2 = [1, 22, 33, 44, 55, 6, 7, 8];
let arr3 = [12, 22, 34, 45, 56, 6, 9, 10];
let newArr = arr1.concat(arr2, arr3);

let uniqueResult = [];
for (let i = 0; i < newArr.length; i++) {
  let arrVal = newArr[i];
  if (!uniqueResult.includes(arrVal)) {
    uniqueResult.push(arrVal);
  }
}
console.log(newArr);

console.log(uniqueResult);