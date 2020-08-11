function sortArray(arr, left = 0, right = arr.length - 1) {
    //判断传入数组有效
    if (arr == null || arr.length == 0) return arr;
    if (left >= right) return arr;
    //  找到pivotIndex索引
    let pivotIndex = Math.floor(left + (right - left) / 2);
    pivotIndex = Search(arr, pivotIndex, left, right);
    // 使用left和right划分三个区域
    sortArray(arr, left, pivotIndex - 1);
    sortArray(arr, pivotIndex + 1, right);
    return arr;

    function Search(arr, pivotIndex, left, right) {
        // 找到pivot索引对应的值
        let pivotA = arr[pivotIndex];
        swap(arr, pivotIndex, right);
        // 定义左右挡板
        let leftBaf = left,
            rightBaf = right - 1;
        //找到循环条件
        while (leftBaf <= rightBaf) {
            if (arr[leftBaf] < pivotA) {
                leftBaf++;
            } else if (arr[rightBaf] >= pivotA) {
                rightBaf--;
            } else { // 同时命中: arr[leftBaf] >= pivot && arr[rightBaf] < privot
                swap(arr, leftBaf++, rightBaf--);
            }
        }
        // 循环结束将pivot归位
        swap(arr, leftBaf, right);
        return leftBaf;

        function swap(arr, indexOne, indexTwo) {
            let temp = arr[indexOne];
            arr[indexOne] = arr[indexTwo];
            arr[indexTwo] = temp;
        }
    }
}

console.log(sortArray([1, 93, 32, 43]))