let userName = prompt("Enter the user name");
let password = prompt("Enter the password");

let correctUserName = "admin";
let correctPassword = "1234";
if (userName.toLowerCase() === correctUserName || password === correctPassword)
  console.log("Login successful");
else console.log("wrong username or password");