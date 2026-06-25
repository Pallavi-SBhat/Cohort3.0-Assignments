let user = {
  name: "Ritik",
  age: 21,
};

if (!user.hasOwnProperty("email")) {
  console.log("Email not provided  add ");
  user.email='ritik@gmail.com'
}