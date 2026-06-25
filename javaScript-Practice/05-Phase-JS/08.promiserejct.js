let promise = new Promise((res, rej) => {
  setTimeout(() => {
    rej("Server Down");
  }, 2000);
});

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error)=>{
console.log("Cought error",error)
  });