let choice = Number(
  prompt("1 add\n2 subtract\n3 multiply\n4 divide \nEnter your choice"),
);
let num1 = Number(prompt("Enter the number 1"));
let num2 = Number(prompt("Enter the number 2"));
switch (choice) {
  case 1:
    console.log("Addition of number", num1 + num2);
    break;
  case 2:
    console.log("Subtraction of number", num1 - num2);
    break;
  case 3:
    console.log("Subtraction of number", num1 * num2);
    break;
  case 4:
    if (num2 === 0) console.log("Cannot be divided by zero");
    else {
      console.log("Division of number", num1 / num2);
    }
    break;
  default:
    console.log("Invalid choice");
}