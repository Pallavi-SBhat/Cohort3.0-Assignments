let name = prompt("Enter the fullname");
let fname = name.split()[0];
let dob = prompt("Enter the date of year");
let symbol = ["-", "_", "@", "$", "&"];
let i=Math.floor(Math.random() * symbol.length)
let randomSymbol = symbol[i];


let userName = fname + randomSymbol + dob;
console.log("User name : ", userName);