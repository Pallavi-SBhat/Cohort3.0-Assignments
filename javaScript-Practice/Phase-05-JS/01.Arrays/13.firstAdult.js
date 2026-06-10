let ages = [12, 15, 17, 19, 22];
function firstAdult(arr) {
  return arr.find((x) => x >= 18);
}
console.log(firstAdult(ages));
