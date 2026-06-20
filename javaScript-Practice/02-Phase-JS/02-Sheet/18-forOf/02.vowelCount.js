let arr=["b","e","a",'i','u','c']
let vowels='AEIOUaeiou'
let count=0;
for(let val of arr){
    if(vowels.includes(val)) count++
}
console.log(count);