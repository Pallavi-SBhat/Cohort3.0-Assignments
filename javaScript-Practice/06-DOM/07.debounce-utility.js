function debounce(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

function sayHello() {
  console.log("Hello");
}
const debounceHello = debounce(sayHello, 2000);
debounceHello();
debounceHello();
debounceHello();
debounceHello();