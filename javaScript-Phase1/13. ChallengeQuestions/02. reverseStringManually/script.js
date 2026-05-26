let str = prompt("Enter the String ");
let reversed = "";
if (str.length == 3) {
  reversed = str[2] + str[1] + str[0];
  console.log("Original: ", str);
  console.log("Reversed: ", reversed);
} else {
  console.log("String length is greater than 3");
}