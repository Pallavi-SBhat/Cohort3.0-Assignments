let user= {
name:"Ritik",
age:21
};
let address= {
city:"Bhopal",
state:"MP"
};
user={...user,...address}
console.log(user);