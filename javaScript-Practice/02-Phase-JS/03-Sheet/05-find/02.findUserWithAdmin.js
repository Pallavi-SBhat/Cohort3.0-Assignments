let users = [
  { username: "rahul" },
  { username: "admin" },
  { username: "aman" }
];
let userNameWithAdmin=users.find((e)=>e.username==='admin')
console.log(userNameWithAdmin);