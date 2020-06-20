var arr = [12,43,545,23,54,123,34];
//对待数组排序，需要比较和交换



//定义比较函数
function compare(a,b){
    if(a > b) return true
        else   return  false
}

//交换函数
function exChange(arr,a,b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

//排序
function sort(arr) {
    for(var i =0;i<arr.length - i;i++){
        for(var j = i + 1;j < arr.length - 1;j++){
            if(compare(arr[j],arr[j+1])){
                exChange(arr,j,j+1);
            }
        }
    }
}

sort(arr);
console.log(arr);