var obj = {
  name: "Rahul",
  getName: function () {
    console.log(this.name);
  },
};

obj.getName();

// using arrow function
var obj = {
  name: "Rahul",
  getName: () => {
    console.log(this.name);
  },
};
obj.getName();