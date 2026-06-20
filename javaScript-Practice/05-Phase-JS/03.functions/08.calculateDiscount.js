var calculateDiscount = (price) => {
  return price - (price * 10) / 100;
};

console.log(calculateDiscount(500));