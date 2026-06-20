let notifications = ["Order Placed", "Order Shipped", "Order Delivered"];
function removeLast(arr) {
  arr.pop();
  return arr;
}

console.log(removeLast(notifications));