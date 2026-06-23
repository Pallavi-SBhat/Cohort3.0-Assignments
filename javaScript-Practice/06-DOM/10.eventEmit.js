function greet() {
  console.log("hello");
}
function welcome() {
  console.log("welcome");
}

const events = {
  login: [greet, welcome],
};
events.login.forEach((element) => {
  element();
});