let name = prompt("Enter the full name");
let arrName = name.split(" ");
let upperInitial = "";
for (let i = 0; i < arrName.length; i++) {
  let firstName = arrName[i];
  let substring = firstName.substring(1, firstName.length);
  let firstLetter = firstName.charAt(0).toUpperCase();
  upperInitial += firstLetter + substring + " ";
}
console.log(upperInitial);