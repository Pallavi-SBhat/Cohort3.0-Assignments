function step1() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Step1 done");
    }, 1000);
  });
}
function step2() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Step2 done");
    }, 1000);
  });
}
function step3() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Step3 done");
    }, 1000);
  });
}

step1()
  .then((step) => {
    console.log(step);
    return step2();
  })
  .then((msg) => {
    console.log(msg);
    return step3();
  })
  .then((msg) => {
    console.log(msg);
  });

const asyncAwait = async () => {
  let data = await step1();

  console.log(data, "async");
  let data2 = await step2();
  console.log(data2, "async");
  let data3 = await step3();
  console.log(data3, "async");
};
asyncAwait();