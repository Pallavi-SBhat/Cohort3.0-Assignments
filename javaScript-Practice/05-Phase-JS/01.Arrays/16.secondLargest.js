let nums = [50, 80, 80, 80, 80];
function secondLargestNumber(arr) {
  arr.sort((a, b) => a - b);
  console.log(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== arr[i - 1]) {
      

      return arr[i - 1];
    }
   
  }
   return -1
}
console.log(secondLargestNumber(nums));