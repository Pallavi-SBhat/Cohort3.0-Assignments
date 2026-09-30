const user = {
  name: "Anubhavi",
  greet:function() {
    console.log(`Hello ${this.name}`);
  },
};
user.greet()