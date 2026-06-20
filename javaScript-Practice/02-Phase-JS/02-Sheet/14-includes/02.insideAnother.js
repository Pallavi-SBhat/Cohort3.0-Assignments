let arr = [2, 4, 8, 9, 4];
let subArr = [8, 9, 1];

let allExists = true;
for (let val of subArr) {
  if (!arr.includes(val)) {
    allExists = false;
    break;
  }
}
console.log(allExists);