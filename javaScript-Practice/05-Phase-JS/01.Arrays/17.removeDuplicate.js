let ids = [1, 2, 2, 3, 4, 4, 5, 5];
function removeDuplicates(arr) {
  //   let newArr = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr.indexOf(arr[i]) == i) {
  //       newArr.push(arr[i]);
  //     }
  //   }
  //   return newArr;
  return arr.filter((item, index) => arr.indexOf(item) == index);
}
console.log(removeDuplicates(ids));