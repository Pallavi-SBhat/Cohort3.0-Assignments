// explicit binding
function introduce(){
    console.log(this.name);
    
}
const  person={
    name:"Hithesh"
}
introduce.call(person)