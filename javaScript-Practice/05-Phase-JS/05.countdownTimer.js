let num = 5;

let interval = setInterval(() => {
  console.log(num);
  num--
  if (num === 0) {
      console.log("done");
      clearInterval(interval);
  }
}, 1000);

