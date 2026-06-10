let cart = [
  {
    name: "Mouse",
    price: 500,
    qty: 2,
  },
  {
    name: "KeyBoard",
    price: 1000,
    qty: 1,
  },
  {
    name: "Monitor",
    price: 10000,
    qty: 1,
  },
];
function getCart(cart) {
  return cart.reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);
}
console.log(getCart(cart));