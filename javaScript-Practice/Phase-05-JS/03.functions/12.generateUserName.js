function generateUserName(str) {
  let strArr = str.split(" ");
  return strArr.join("_").toLowerCase();
}
console.log(generateUserName("Hithesh Amin"));