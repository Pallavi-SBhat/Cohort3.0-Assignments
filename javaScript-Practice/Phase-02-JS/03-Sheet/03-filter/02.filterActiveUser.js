let users = [
  { name: "Anubhav", active: true },
  { name: "Rahul", active: false },
  { name: "Aman", active: true },
];

let activeUser = users.filter((e) => e.active === true);
console.log(activeUser);