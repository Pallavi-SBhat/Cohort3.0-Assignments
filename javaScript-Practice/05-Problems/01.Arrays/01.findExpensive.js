let prices = [100, 250, 500, 150, 700];

function findExpensiveProducts(prices) {
  let expensive = [];
  for (let i = 0; i < prices.length; i++)
    if (prices[i] >= 300) expensive.push(prices[i]);
  return expensive;
}

console.log(findExpensiveProducts(prices));

// using filter
let premiumProducts = prices.filter((price) => price >= 300);
console.log(premiumProducts);