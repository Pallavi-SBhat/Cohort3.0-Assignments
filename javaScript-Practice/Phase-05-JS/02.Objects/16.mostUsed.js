let votes = {
  JavaScript: 25,
  Python: 30,
  Java: 15,
  Cpp: 10,
};

let highestVotes = 0;
let language = "";
for (let [key, value] of Object.entries(votes)) {
  if (highestVotes < value) {
    language = key;
    highestVotes = value;
  }
}
console.log(language);
