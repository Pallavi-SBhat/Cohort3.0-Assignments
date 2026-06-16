let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    stock: 10,
  },
  {
    id: 2,
    name: "KeyBoard",
    price: 1500,
    stock: 10,
  },
  {
    id: 3,
    name: "Mouse",
    price: 1000,
    stock: 10,
  },
];

function addProduct(product) {
  let productIndex = products.findIndex((p) => p.id == product.id);
  if (productIndex == -1) return products.push(product);
  if (products[productIndex].name === product.name) {
    products[productIndex].price = product.price;
    products[productIndex].stock += product.stock;
  }

  return products;
}
let product = {
  id: 3,
  name: "Mouse",
  price: 1000,
  stock: 10,
};
console.log(addProduct(product));

function removeProduct(productId) {
  let productIndex = products.findIndex((p) => p.id == productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    return "product removed ";
  }
  return `Product not found`;
}

function updateStock(id, productStock) {
  let productIndex = products.findIndex((p) => p.id == id);
  if (productIndex == -1) return `product not found`;
  products[productIndex].stock += productStock;
  return `Product stock updated successfully`;
}
console.log(removeProduct(2));
console.log(products);

console.log(updateStock(1, -5));
console.log(products);
