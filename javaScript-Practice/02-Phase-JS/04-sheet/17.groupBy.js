const users = [
  { name: "A", age: 20 },
  { name: "B", age: 21 },
  { name: "C", age: 20 },
];
let grouped = users.reduce((acc, curr) => {
  console.log("ACC", acc, "Curr", curr);

  if (!acc[curr.age]) {
    acc[curr.age] = [];
  }
  acc[curr.age].push(curr);
  return acc;
}, {});

console.log(grouped);

// using groupby method
const groupedd = Object.groupBy(users, (n) => n.age);
console.log(grouped);