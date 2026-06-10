let number = [5, 1, 2, 4, 3, 2, 4, 2, 5, 1, 1, 1];
let obj = {};
for (let i = 0; i < number.length; i++) {
  obj[number[i]] = (obj[number[i]] || 0) + 1;
}

console.log(obj);
let highest = 0;
let Value = 0;
for (let key in obj) {
  if (obj[key] > highest) {
    highest = obj[key];
    Value = key;
  }
}
// console.log(Value);

for (let [keys, values] of Object.entries(obj)) {
  console.log(keys, values);
}