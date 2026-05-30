let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 6, 5, 7, 5, 3, 5];
let index = arr.indexOf(5);
while (index !== -1) {
  console.log(index);
  index = arr.indexOf(5, index + 1);
}