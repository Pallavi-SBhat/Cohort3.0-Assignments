let mark = Number(prompt("Enter the mark (1-100)"));
if (mark > 100) console.log("Invalid data");
else if (mark >= 90) console.log("A");
else if (mark >= 75) console.log("B");
else if (mark >= 50) console.log("C");
else console.log("Fail");