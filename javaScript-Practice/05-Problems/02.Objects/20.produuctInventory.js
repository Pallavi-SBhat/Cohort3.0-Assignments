let inventory = {
  mouse: 25,
  keyboard: 10,
  monitor: 5,
  laptop: 2,
};

function totalItems(obj) {
  return Object.values(obj).reduce((acc, curr) => acc + curr);
}
function highestStock(obj) {
  let highest = 0;
  let product = "";
  for (let [key, value] of Object.entries(obj)) {
    if (highest < value) {
      highest = value;
      product = key;
    }
  }
  return [product, highest];
}
function lowestStock(obj) {
  let firstKey = Object.keys(obj)[0];
  let lowest = obj[firstKey];
  let product = firstKey;
  for (let [key, value] of Object.entries(obj)) {
    if (lowest > value) {
      lowest = value;
      product = key;
    }
  }
  return [product, lowest];
}
console.log("Total Items:", totalItems(inventory));
console.log("Product with highest Items:", highestStock(inventory));
console.log("Product with lowest Items:", lowestStock(inventory));