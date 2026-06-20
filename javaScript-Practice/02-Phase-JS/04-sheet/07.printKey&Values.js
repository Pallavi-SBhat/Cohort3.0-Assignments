const person = {
  name: "Rahul",
  age: 22,
  city: "Delhi"
}
for (let key in person) {
  console.log(key, person[key]);
}