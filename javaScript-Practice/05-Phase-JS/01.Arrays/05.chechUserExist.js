let users = ["Aman", "Ritik", "Priya"];
function userExists(arr, user) {
  if (arr.includes(user)) return "User exists";
  return "User does not exists";
}

console.log(userExists(users,"Ritik"));