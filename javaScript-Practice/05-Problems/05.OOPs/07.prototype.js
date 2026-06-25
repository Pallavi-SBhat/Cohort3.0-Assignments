function Person(name) {
  this.name = name;
}

Person.prototype.greet=function(){
    console.log(`Hello ${this.name}`)
}
const p1=new Person('Hithesh')
console.log(p1.greet())

// second method 