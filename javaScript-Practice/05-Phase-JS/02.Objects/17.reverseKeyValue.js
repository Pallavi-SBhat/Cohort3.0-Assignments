let countries = {
  India: "Delhi",
  Japan: "Tokyo",
  France: "Paris",
};
let state = {};
for (let [key, value] of Object.entries(countries)) {
  state[value] = key;
}
console.log(countries);
console.log("Reversed");
console.log(state);