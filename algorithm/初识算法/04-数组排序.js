var arr = [12,23345,456,234124,123,2354,23];  //定义数组

function getMin(arr) {
    if(arr == null || arr.length == 0) return; //判断数组长度
    var index = -1;
    for(var i = 0;i < arr.length; i++){
        if(arr[i] != null && arr[i] < arr[index] || arr[i] != null && index == -1){
                index =i ;
        }
    }
    var result = arr[index];
    arr[index] = null;
    return result;
}


function sort(arr) {
    var newArr = new Array(arr.length);  //创建一个与arr等长度的空数组
    for(var i =0;i<newArr.length;i++)
    {
        newArr[i] = getMin(arr);
    }
    return newArr;
}

console.log(sort(arr));
