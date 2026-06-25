let users = [{ name: "Ritik" }, 
  { name: "Aman" },
   { name: "Priya" }];
function findUser(users, userName) {
  let user = users.find((u)=>u.name===userName);
  return user;
}
console.log(findUser(users,"Ritik"));