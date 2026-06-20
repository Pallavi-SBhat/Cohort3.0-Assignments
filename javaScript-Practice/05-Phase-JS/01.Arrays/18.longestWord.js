let words = ["JavaScript", "HTML", "CSS", "Programming"];
function longestWord(arr) {
  let max='' ;
  for (let i = 0; i < arr.length; i++) {
    let str= arr[i];
    if (str.length > max.length) max=str;
  }
  return max;
}
console.log(longestWord(words));