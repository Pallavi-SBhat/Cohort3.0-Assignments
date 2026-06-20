'strict mode'
function show(){
    this.name='Hitesh'
    console.log(this);
}

show()

let showArr=()=>{
    this.name='Hithesh'
    console.log(this);
    
}
showArr()
