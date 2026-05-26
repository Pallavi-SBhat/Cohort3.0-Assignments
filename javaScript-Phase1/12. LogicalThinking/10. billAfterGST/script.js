let bill=Number(prompt("Enter the bill amount before GST"));
let gst=0.18;
let afterGST=bill*(1+gst)
console.log(`Amount Calculation 
   Bill Amount: ${bill}
   GST        : ${gst*100}%
   Total Bill : ${afterGST}`);