var arr = [2,3,5,6,7,42,25];

function quickSort(arr) {
    //判断数组是否位空
    if(arr == null || arr.length==0)return [];
    var leader = arr[0];
    //小的占我左边 大的站在我右边
    var left = [];
    var right = [];

    for(var i= 0;i<arr.length;i++){
        if(arr[i] < leader){
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    left.push(leader);
    return left.concat(right);
}
console.log(quickSort(arr));