const user = {
  name: "Ritik",
  greet() {
    console.log(this.name);
  },
};

const fn = user.greet.bind(user);
fn();