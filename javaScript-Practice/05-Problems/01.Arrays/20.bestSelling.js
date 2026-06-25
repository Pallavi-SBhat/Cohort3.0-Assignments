let sales = ["Mouse", "Keyboard", "Mouse", "Laptop", "Mouse", "Keyboard"];
function getBestSeller(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = (obj[arr[i]] || 0) + 1;
  }
  console.log(obj);
  let bestSeller = "";
  let maxCount = 0;
  for (let [key, value] of Object.entries(obj)) {
    if (value > maxCount) {
      maxCount = value;
      bestSeller = key;
    }
  }
  return bestSeller;
}
console.log(getBestSeller(sales));