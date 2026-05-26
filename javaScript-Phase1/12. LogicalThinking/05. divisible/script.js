let num = Number(prompt("Enter the number"));
if (num % 2 === 0 && num % 3 === 0)
  console.log(num + " is Divisible by 2 and 3");
else if (num % 2 == 0) console.log("The number is divisible by 2");
else if (num % 3 == 0) console.log("The number is divisible by 3");
else console.log(num + " is not  Divisible by 2 and 3");