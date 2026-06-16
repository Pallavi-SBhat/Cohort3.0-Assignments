class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  work() {
    console.log(`${this.name}  is working `);
  }
}

class Developer extends Employee {
  constructor(name, salary) {
    super(name, salary);
  }
  code() {
    console.log(`${this.name} is developer he is coding `);
  }
}
const dev=new Developer('Hithesh')
dev.work()
dev.code()