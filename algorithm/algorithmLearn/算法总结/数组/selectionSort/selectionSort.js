function selectionSort(arr) {
    const len = arr.length;
    let temp, minIndex = -1;
    if (arr == null || arr.length == 0) {
        return arr
    }
    for (let i = 0; i < len - 1; i++) { //循环找到实际min索引
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        // 三段论swap
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
let arr = [1, 23, 43, -1, 4, -3];
console.log(selectionSort(arr));