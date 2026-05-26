let choice = Number(
  prompt(`Enter your choice 
        1:Withdraw
        2:Deposit
        3:GetBalance`),
);
if (choice == 1 || choice == 2) {
  let amount = Number(prompt("Enter the amount"));
}

let balance = 5000;
switch (choice) {
  case 1:
    if (amount > balance) console.log("insufficient Balance");
    else {
      console.log(`Balance:${balance}`);
      balance -= amount;
      console.log(`Amount Withdrawn: ${amount}
    New Balance ${balance}`);
    }
    break;
  case 2:
    console.log(`Balance: ${balance}`);
    balance += amount;
    console.log(`Amount Deposited: ${amount}
    New Balance ${balance}`);
    break;
  case 3:
    console.log("Balance: ", balance);
  default:
    console.log("Invalid Choice");
}