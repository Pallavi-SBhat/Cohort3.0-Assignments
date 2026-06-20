function addTen(num) {
  return new Promise((res) => {
    res(num + 10);
  });
}

addTen(0)
  .then((result) => {
    console.log(result);

    return addTen(result);
  })
  .then((result) => {
    console.log(result);
    return addTen(result);
  }).then((result)=>{
    console.log(result)
    return addTen(result)
  })