class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }
  getGrade() {
    if (this.marks >= 90) return "A";
    if (this.marks >= 75) return "B";
    if (this.marks >= 60) return "C";
    if (this.marks < 60) return "Fail ho gaya bhondu";
  }

}
const student1=new Student("Hithesh",90)
console.log(student1.getGrade());
