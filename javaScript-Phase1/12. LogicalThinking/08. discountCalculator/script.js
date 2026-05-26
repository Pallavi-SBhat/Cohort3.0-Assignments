let totalBill = Number(prompt("Enter the total bill "));
let discount = 0;
if (totalBill < 2000) discount = 0;
else if (totalBill < 4000) discount = 0.03;
else if (totalBill < 6000) discount = 0.05;
else if (totalBill < 10000) discount = 0.1;
else discount = 0.2;

let amountToPay = totalBill - totalBill * discount;
console.log(`Billing details
    Amount Billed : ${totalBill}
    Discount      : ${discount *100 }%
          -       : 
    Amount to pay : ${amountToPay}`);