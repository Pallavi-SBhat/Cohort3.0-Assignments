let cart = [
  { name: "Mouse", price: 500, qty: 2 },
  { name: "Keyboard", price: 1000, qty: 1 },
  { name: "Monitor", price: 10000, qty: 1 },
];
function getCartTotal(cart) {
  let cartTotal = cart.reduce((acc, curr) => {
    let total = curr.price * curr.qty;
    return acc + total;
  }, 0);
  return cartTotal;
}
console.log(getCartTotal(cart));