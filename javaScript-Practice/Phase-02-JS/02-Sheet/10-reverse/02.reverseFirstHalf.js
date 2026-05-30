let arr = [1, 2, 3, 4, 5];

console.log(arr);


let mid=Math.floor(arr.length/2)
let left=0;
let right=mid;
while(left<right){
    let temp=arr[left];
    arr[left++]=arr[right]
    arr[right--]=temp
}
console.log(arr);