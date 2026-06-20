const user = {
  name: "Anubhav",
  marks: 85,
  getResult(){
    return this.marks > 40 ? "pass" : "Fail";
  },
};

console.log(user.name);
console.log(user.marks);
console.log(user.getResult());