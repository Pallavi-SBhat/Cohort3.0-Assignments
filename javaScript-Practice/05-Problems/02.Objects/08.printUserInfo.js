let user = {
  name: "Ritik",
  age: 20,
  city: "Bhopal",
};
console.log("Name:", user.name);
console.log("Age:", user.age);
console.log("City:", user.city);

for (let [key, values] of Object.entries(user)) {
  console.log(key, values);
}