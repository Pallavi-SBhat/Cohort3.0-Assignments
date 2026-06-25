let products = [
  {
    name: "Mouse",
    price: 500,
    sold: 20,
  },
  {
    name: "Keyboard",
    price: 1000,
    sold: 10,
  },
];

function revenuePerProduct(products) {
  return products.map((product) => {
    let revenue = product.price * product.sold;
    return {
      name: product.name,
      revenue: revenue,
    };
  });
}
function totalRevenue(products) {
  return products.reduce((acc, current) => {
    return acc + current.price * current.sold;
  }, 0);
}

function bestSellingProduct(products) {
  return products.reduce((previous, current) => {
    return previous.sold < current.sold ? current : previous;
  });
}
console.log("Revenue per product");

console.log(revenuePerProduct(products));

console.log("Total Revenue ");
console.log(totalRevenue(products));
console.log("Best Selling Product ");
console.log(bestSellingProduct(products));