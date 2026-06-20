const user = {
  name: "Anubhav",
  greet:function() {
    console.log(`Hello ${this.name}`);
  },
};
user.greet()