let marks= [80,90,70];
function convertToPercentage(arr){
    let percentageArr=arr.map(x=>x+'%')
    return percentageArr;
}
console.log(convertToPercentage(marks));