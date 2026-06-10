let nums = [1, 2, 3, 4, 5];
function rotateArrayRight(arr) {
  //    // if k=1
  //     let temp = arr[arr.length - 1];
  //     for (let i = arr.length - 1; i >= 0; i--) {
  //       arr[i] = arr[i - 1];
  //     }
  //     arr[0] = temp;
  //     return arr;
  //   builtin
  if (arr.length > 0) {
    let lastNumber = arr.pop();
    arr.unshift(lastNumber);
  }
  return arr;
}
console.log(rotateArrayRight(nums));