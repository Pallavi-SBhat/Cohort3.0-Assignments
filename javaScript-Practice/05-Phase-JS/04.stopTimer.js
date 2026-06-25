
console.log("Timeout started");

let timerId=setTimeout(() => {
    console.log("hello");
    
}, 5000);

clearTimeout(timerId);