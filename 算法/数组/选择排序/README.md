## 选择排序
[]()

## 描述
给定整数数组，请按升序对数组中的元素进行排序。选择排序算法应用于解决此问题。
**举例**
- {3，1，-3，2，9} 排序后 {-3,1,2,3,9}

**缜密**
- 如果数组为空，那么我们不做任何事情。
- 如果数组的长度为0，那么我们不做任何事情。


## 思路

- 判断传入数组是否为空
- 令当前循环的第一个元素为当前min元素
- 循环当前其余元素，找到实际的min元素
- 将实际min元素与第一个元素交换
- 进行下一次循环
- 正在循环的左边的内容是已排序的


## 代码

```js
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
```

## 测试用例
```js
let arr = [1, 23, 43, -1, 4, -3];
console.log(selectionSort(arr));
// 输出[ -3, -1, 1, 4, 23, 43 ]
```

## 复杂
### time
有n个元素要检查，n-1个要比较并在每次循环中找到当前最小的元素,
所以n,n-1,n-2,.....,2,1次运算，
等差数列求和  n * (n + 1) / 2 -> O(n^2) 
### space
O(1)
