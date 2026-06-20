function greet(name) {
  console.log(`hello ${name}`);
}
function welcome(name, callback) {
  let user = name;
  callback(user);
}

welcome('Hithesh',greet);