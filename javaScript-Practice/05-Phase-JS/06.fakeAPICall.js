let obj = {
  id: 1,
  name: "Hithesh",
};

function APICall(name) {
  console.log(name);
}

function fetchUser(name, callback) {
  callback(name);
}
process.stdout.write("Fetching user details.");
let interval = setInterval(() => {
  process.stdout.write(".");
}, 1000);

setTimeout(() => {
    console.log()
  clearInterval(interval);
  fetchUser(obj, APICall);
}, 6000);