let user = {
  name: "John",
  address: {
    city: "Mumbai",
    state: "Maharashtra",
  },
};

let path = "address.city";
let pathExists = true;
let pathArray = path.split(".");
for (let key of pathArray) {
  if (!(key in user)) {
    pathExists = false;
  }
  user = user[key];
}
console.log(pathExists);