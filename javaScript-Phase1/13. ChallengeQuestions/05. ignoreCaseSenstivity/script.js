let str1 = prompt("Enter the first word");
let str2 = prompt("Enter the second word");
if (str1.toLowerCase() === str2.toLowerCase()) {
  console.log(`${str1} and ${str2} are equal`);
} else console.log(`${str1} and ${str2} are not  equal`);