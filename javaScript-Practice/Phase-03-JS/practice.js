// Q1. Create a function that returns the sum of two numbers.
function add(a, b) {
  return a + b;
}
console.log("Q1 Output:", add(10, 20));

// Q2. Create a function that returns the square of a number.
function square(n) {
  return n ** 2;
}
console.log("Q2 Output:", square(5));

// Q3. Create a function that checks whether a number is Even or Odd.
function checkEvenOdd(n) {
  return (n & 1) === 0 ? "Even" : "Odd";
}
console.log("Q3 Output:", checkEvenOdd(7));

// Q4. Create a function that returns the larger number among two numbers.
function max(a, b) {
  return a > b ? a : b;
}
console.log("Q4 Output:", max(10, 20));

// Q5. Create a function that checks if a person is eligible to vote.
function isEligible(age) {
  return age >= 18 ? "Eligible" : "Not Eligible";
}
console.log("Q5 Output:", isEligible(18));

// Q6. Print numbers from 1 to 50 using a loop.
console.log("Q6");

for (let i = 1; i <= 50; i++) {
  process.stdout.write(i + " ");
}
console.log();
// Q7. Print all even numbers between 1 and 100.
console.log("Q7");
for (let i = 1; i <= 100; i++) {
  if ((i & 1) === 0) process.stdout.write(i + " ");
}
console.log();

// Q8. Find the sum of numbers from 1 to 100.
function sumOfNumbers(s, e) {
  let sum = 0;
  for (i = s; i <= e; i++) {
    sum += i;
  }
  return sum;
}
console.log("Q8 Output", sumOfNumbers(1, 100));

// Q9. Print the multiplication table of a number.
function table(n) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${n} X ${i} = ${n * i}`);
  }
}
console.log("Q9");
table(5);

// Q10. Count how many digits are present in a number.
function countDigits(n) {
  let count = 0;
  while (n != 0) {
    n = Math.floor(n / 10);
    count++;
  }
  return count;
}
console.log("Q10 Output:", countDigits(12345));

// Q11. Reverse a string.
function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log("Q11 Output:", reverseString("hello"));

// Q12. Count vowels in a string.
function countVowels(str) {
  let vowels = "aeiouAEIOU",
    count = 0;
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) count++;
  }
  return count;
}
console.log("Q12 Output:", countVowels("javascript"));

// Q13. Check whether a string is a palindrome.
function isPalindrome(str) {
  let rev = str.toLowerCase().split("").reverse().join("");
  return rev === str.toLowerCase() ? true : false;
}
console.log("Q13 Output:", isPalindrome("Madam"));

// Q14. Convert the first letter of every word to uppercase.console.log("Q12 Output:");
function capitalize(str) {
  let ans = "";
  let arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length == 1) {
      ans += arr[i].toUpperCase();
    } else if (arr[i].length > 1) {
      ans += arr[i][0].toUpperCase() + arr[i].slice(1);
    }
    if (arr.length - 1 > i) ans += " ";
  }
  return ans;
}
console.log("Q14 Output:", capitalize("hello world"));

// Q15. Count how many times a character appears in a string.
function countChar(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i].toLowerCase() === char) count++;
  }
  return count;
}
console.log("Q15 Output:", countChar("Javascript", "a"));

// Q16. Find the largest number in an array.
var arr = [10, 20, 30, 40, 50];
function findMax(arr) {
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    max = arr[i] > max ? arr[i] : max;
  }
  return max;
}
console.log("Q16 Output:", findMax(arr));

// Q17. Find the smallest number in an array.
var arr = [10, 20, 30, 40, 50];
function findSmall(arr) {
  let small = arr[0];
  for (let i = 0; i < arr.length; i++) {
    small = arr[i] < small ? arr[i] : small;
  }
  return small;
}
console.log("Q17 Output:", findSmall(arr));

// Q18. Find the sum of all array elements.
var arr = [1, 2, 3, 4, 5];
function findSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
console.log("Q18 Output:", findSum(arr));

// Q19. Return only even numbers from an array.
var arr = [1, 2, 3, 4, 5, 6];
function printEven(arr) {
  let evenArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 == 0) evenArr.push(arr[i]);
  }
  return evenArr;
}
console.log("Q19 Output:", printEven(arr));

// Q20. Remove duplicate values from an array.
var arr = [1, 2, 2, 3, 4, 4, 5];
function removeDuplicates(arr) {
  let uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!uniqueArr.includes(arr[i])) uniqueArr.push(arr[i]);
  }
  return uniqueArr;
}
console.log("Q20 Output:", removeDuplicates(arr));

// Build a Student Marks Calculator.
var arr = [50, 60, 70, 80, 90];
function highestMarks(arr) {
  let highest = arr[0];
  for (let i = 0; i < arr.length; i++) {
    highest = highest < arr[i] ? arr[i] : highest;
  }
  return highest;
}
function lowestMarks(arr) {
  let lowest = arr[0];
  for (let i = 0; i < arr.length; i++) {
    lowest = lowest > arr[i] ? arr[i] : lowest;
  }
  return lowest;
}

function averageMarks(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total / arr.length;
}
function totalMarks(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

console.log("Highest marks:", highestMarks(arr));
console.log("Lowest marks:", lowestMarks(arr));
console.log("Average marks:", averageMarks(arr));
console.log("Total marks:", totalMarks(arr));