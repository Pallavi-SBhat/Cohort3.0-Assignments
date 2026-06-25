function greet(name) {
  console.log(`Hello ${name}`);
}

let name = "Hithesh";

setTimeout(() => {
  greet(name);
  console.log(1);
  setTimeout(greet, 2000, name);
}, 2000);