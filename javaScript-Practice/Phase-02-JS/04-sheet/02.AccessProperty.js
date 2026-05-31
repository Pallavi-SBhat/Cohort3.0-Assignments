const car = {
  brand: "BMW",
  model: "M4",
  year: 2022,
};

let detailsUsingDotNotation = `Brand    : ${car.brand}
Model    : ${car.model}`;

let detailsUsingBracket = `Brand    : ${car["brand"]}
Model    : ${car["model"]}`;
console.log(detailsUsingDotNotation);
console.log(detailsUsingBracket);