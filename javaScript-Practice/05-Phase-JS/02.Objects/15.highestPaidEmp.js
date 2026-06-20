let employees = {
  aman: 25000,
  ritik: 50000,
  priya: 45000,
};
let highest = 0;
let name;
for (let [key, values] of Object.entries(employees)) {
  if (highest < values) {
    highest = values;
    name = key;
  }
}
console.log(name);
