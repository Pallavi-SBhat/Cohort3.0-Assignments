function fetchData() {
 return new Promise((resolve) => {
 setTimeout(() => {
 resolve("Data Received");
 }, 2000);
 });
}
fetchData()
.then(data => {
console.log(data);
})
.catch(err => {
console.log(err);
});


const handleData=async()=>{
    try{
        const data=await fetchData()
        console.log('====================================');
        console.log(data);
        console.log('====================================');
    }catch(err){
        console.log(err)
    }
}
handleData()