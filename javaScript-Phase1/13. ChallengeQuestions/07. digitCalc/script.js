let num = Number(prompt("Enter the number "));
let digit = 0;
let temp = num;
while (num != 0) {
  digit++;
  num = Math.floor(num / 10);
}

if (digit == 2) console.log(`${temp} has 2 digit`);
if (digit == 3) console.log(`${temp} has 3 digit`);