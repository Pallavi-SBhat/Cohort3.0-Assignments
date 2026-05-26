let str = prompt("Enter your sentence");
console.log("Sentence\n", str);
let char = 0;
for (let i = 0; i < str.length; i++) {
  if (str[i] != " ") char++;
}
console.log("Total characters in this sentence is ", char);