let marks = [80, 90, 70, 85, 95];
function findAverage(arr) {
    let sum=0;
    for(let i=0;i<arr.length;i++){
        sum+=arr[i];
    }
    return sum/arr.length
}
console.log(findAverage(marks));



let totalMarks = marks.reduce((acc, marks) => {
  return acc + marks;
}, 0);
console.log(totalMarks);
let average = totalMarks / marks.length;
console.log(average);