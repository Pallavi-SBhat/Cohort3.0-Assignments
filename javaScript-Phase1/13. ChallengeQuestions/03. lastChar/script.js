let str = prompt("Enter the String");
let lastChar = "";
if (str[str.length - 1] == " ") lastChar = "space";
else lastChar = str[str.length - 1];
console.log(str);

console.log("Last character of the string is ",lastChar);