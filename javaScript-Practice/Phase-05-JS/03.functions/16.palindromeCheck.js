function isPalindrome(str) {
  let reversed = str.split("").reverse().join("");
  return str === reversed ? true : false;
}
console.log(isPalindrome("madam"));