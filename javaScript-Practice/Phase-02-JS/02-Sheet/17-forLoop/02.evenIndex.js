let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 0; i < arr.length; i++) {
  if ((i & 1) == 0) console.log(arr[i]);
}