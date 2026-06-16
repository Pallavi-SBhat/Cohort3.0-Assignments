class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount >= 0) {
      this.#balance += amount;
    } else {
      console.log("Aukath me raho");
    }
  }
  withdraw(amount) {
    if (this.#balance < amount) {
      console.log("Insufficient Balance");
    } else {
      this.#balance -= amount;
    }
  }
  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(1000);
acc.withdraw(300);
console.log(acc.getBalance());