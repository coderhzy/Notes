var arr = [12,43,545,23,54];

//排序 需要选择 交换

//比较函数
function compare(a,b) {
    if(a < b) return 1
    else return 0;
}

//交换哈数
function exChange(arr,a,b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}


//排序函数
function sort(arr) {
    for(var i = 0;i<arr.length -1 ;i++){
        var maxIndex = i;
        for(var j = i+ 1; j<arr.length;j++){
            if(compare(arr[maxIndex],arr[j])){
                maxIndex = j;               //将最大的数的索引保存
            }
        }
        exChange(arr,maxIndex,i); //与i位置的数字进行交换，将最大（或者最小放在最前面）
    }
}


//比如i = 0 ，j 从1 开始，外层循环执行一次，从i+1位置遍历一遍数组。将maxIndex = i 赋值为 j，则代表比较剩下的数组，第一个位置已经
//通过第一次循环把最大的数字交换在第一个位置了。

sort(arr);
console.log(arr);