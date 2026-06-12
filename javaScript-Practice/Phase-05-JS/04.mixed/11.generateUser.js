let users = [{ name: "Ritik Rajput" }, { name: "Aman Gupta" }];

function generateUserName(users) {
  return users.map((user) => {
    let arr=user.name.split(" ");
    return arr.join('_').toLowerCase();
  });
}

console.log(generateUserName(users));