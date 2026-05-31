const salaries = {
  john: 1000,
  alex: 2000,
  bob: 1500,
};
let sum = 0;
for (let key in salaries) {
  sum += salaries[key];
}
console.log(sum);

// using reduce function
let entryArray = Object.entries(salaries);


let reduceSum = entryArray.reduce((acc, curr) => {
    
    return acc + curr[1]
    
},0);
console.log(reduceSum);