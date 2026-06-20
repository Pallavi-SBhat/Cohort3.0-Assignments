let str = "banana";
let obj = {};
for (let i = 0; i < str.length; i++) {
  obj[str[i]] = (obj[str[i]] || 0) + 1;
}
console.log(obj);

// using reduce
let freq = str.split("").reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
console.log(freq);