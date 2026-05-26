let age = Number(prompt("Enter the age"));
if (age >= 18) {
  let license = prompt("Do you have driving license (yes or no)");

  if (license.toLowerCase() === "yes") console.log("You can drive");
  else console.log("You don't have license you cannot drive");
}
else console.log("You are underaged so you cannot drive");