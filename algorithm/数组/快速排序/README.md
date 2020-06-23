## 链表的中间结点
[]()

## 描述

给定一个整数数组，按升序对数组中的元素排序。 解决这个问题应该采用快速排序算法。
**举例**
- {3，1，-3，2，9} 排序后 {-3,1,2,3,9}

**缜密**
- 如果数组为空，那么我们不做任何事情。
- 如果数组的长度为0，那么我们不做任何事情。

## 思路

- 在开始和结束之间随机选择一个索引作为pivot
- 在pivot之间/之后对数组进行递归排序
- 将pivot移动到数组末尾，在原来数组对start和end位置加上i，j索引。
- 将i，j看成挡板，i--，j--进行扫描数组
  1. i的左侧放小于pivot的数字
  2. j的右侧放大于pivot的数字
  3. [i,j]放未知探索区域
- 当i>j，则表示扫描完成。此时数组i左侧都是小于pivot，j右侧都是大于pivot


## 代码

```js
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
```

## 测试用例
```js
console.log(sortArray([1, 93, 32, 43]))
//输出 [ 1, 32, 43, 93 ]
```
### time
时间复杂度：分区需要 O(n)时间来检查数组中的每个元素。 堆栈上有log(n)的层数,然后我们递归的进行排序,就要经历log(n).
最终时间复杂度为:O(nlog(n))
worst-Time：我们遇到最大，最小元素为pivot，则O(n^2)
### space
空间复杂度:递归树有log(n)层.O(log(n))