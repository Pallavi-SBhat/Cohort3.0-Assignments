let orders = [
  {
    id: 1,
    customer: "Ritik",
    amount: 5000,
    status: "Pending",
  },
  {
    id: 2,
    customer: "Hithesh",
    amount: 6000,
    status: "Pending",
  },
];

function createOrder(order) {
  orders.push(order);
  return orders;
}

function updateStatus(id) {
  let orderId = orders.findIndex((o) => o.id == id);
  if (orderId == -1) return "order not found";
  if (orders[orderId].status === "Pending") {
    orders[orderId].status = "Completed";
    return `Status updated to Completed of Customer  ${orders[orderId].customer}`;
  }
  orders[orderId].status = "Pending";
  return `Status updated to pending of Customer ${orders[orderId].customer}`;
}

function getPendingOrders() {
  return orders.filter((o) => o.status == "Pending");
}
function getCompletedOrders() {
  return orders.filter((o) => o.status == "Completed");
}

let order1 = {
  id: 3,
  customer: "Ritik",
  amount: 11000,
  status: "Pending",
};
let order2 = {
  id: 4,
  customer: "Pallavi",
  amount: 10000,
  status: "Completed",
};
console.log(createOrder(order1));
console.log(createOrder(order2));

console.log(updateStatus(2));

console.log("Pending orders");
console.log(getPendingOrders());

console.log("Completed Orders");
console.log(getCompletedOrders());