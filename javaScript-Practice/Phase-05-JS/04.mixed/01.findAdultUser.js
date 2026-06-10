let users = [
  {
    name: "Rithik",
    age: 20,
  },
  {
    name: "Aman",
    age: 16,
  },
  {
    name: "Priya",
    age: 25,
  },
];
function getAdultPeople(u) {
  return u.filter((user) => user.age >= 18);
}

console.log(getAdultPeople(users));