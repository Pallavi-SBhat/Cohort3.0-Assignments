const user = {
  name: "Anubhav",
  address: {
    city: "Bhopal",
    pincode: 462001,
  },
};

console.log(user);

for (let key in user) {
  if (typeof user[key] === "object") {
    for (let innerKey in user[key]) {
      console.log(innerKey, user[key][innerKey]);
    }
  } else {
    console.log(key, user[key]);
  }
}