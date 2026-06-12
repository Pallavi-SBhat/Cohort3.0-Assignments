const prompt = require("prompt-sync")();

function login(username, password) {
  return username === "admin" && password == "1234" ? true : false;
}

do {
  var username = prompt("Enter the username ");
  var password = prompt("Enter the password ");
  if (!login(username,password)) console.log("Invalid credentials");
} while (login(username,password) == false);
console.log("Login successful");