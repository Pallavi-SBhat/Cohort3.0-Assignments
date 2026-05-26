let username;
let password;
do {
  username = prompt("Enter the user name");
  password = prompt("Enter the password");
  if (username == "admin" && password == "1234") {
    console.log("login successful");
    break;
  } else {
    console.log("Try again");
  }
} while (username != "admin" || password != "1234");