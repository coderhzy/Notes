## MergeSort
[]()

## 描述

给定一个数组，将其拆分再合并并且升序排序

**举例**

- {1, 3, 4, 1, 5} 排序后 {[ 1, 1, 3, 4, 5 ]}

**缜密**
- 如果数组为空，那么我们不做任何事情。
- 如果数组的长度为0，那么我们不做任何事情。

## 思路

- 将数组对半砍，左边和右边继续对半砍，砍到不能再分
- 将左侧和右侧都DFS递归拆分
- 从最下方比较数组大小，移动小的在前面，然后合并。一层一层向上。
- 最终得到排序好的数组


## 代码

```js
/**
 * 假设有5个数字，我们从中间分开，将左边排好序，右边也排好序。
 * 再分左边和右边，再排序，一直到不可以分为止，这样我们就排好序了。
 * 
 *                   6,5,3,2,9
 *                   /       \
 *                6 5 3     6 1
 *               /    \    /   \
 *            6  5    3   6     1
 *           /    \
 *          6      5
 * 
 * 用6和5来比较，排序后返回上一层。 再和3比较，谁小就移动谁，放在前面，。。。。。。
 * 
 * 时间复杂度： nlog(n)    [整个二叉树有log(n)层，每层返回合并一次，时间是n，所以是n * log(n)]
 * 空间复杂度:  因为拆分和合并，都是DFS，遵循冯诺伊曼体系。 0(n/2 + n/4 + n/8 + ...... + 1) = O(n)
 */

function mergeSort(arr) {
    //判断数组是否为空或为0
    if (arr === null || arr.length === 0) {
        return arr;
    }
    // 将数组复制一份
    let temp = arr.slice();
    arrSort(arr, temp, 0, arr.length - 1);
    return arr;
    /**
     *  将数组从中间分成左边和右边，定义两个指针,分别指向两个数组的开头
     */
    /**
     * 向下递归拆分
     * @param arr
     * @param temp
     * @param start
     * @param end
     */
    function arrSort(arr, temp, start, end) {
        //base case:当数组不可以再分
        if (start >= end) {
            return;
        }
        // 不要用(end+start)/2，防止数值过大
        let mid = start + (end - start) / 2;
        arrSort(arr, temp, start, mid);
        arrSort(arr, temp, mid + 1, end);
        merge(arr, temp, start, mid, end);
    }

    function merge(arr, temp, start, mid, end) {
        // 定义左右指针 + 标识排序数组当前索引index
        let left = start,
            right = mid + 1,
            index = start;
        // 开始移动，左指针不超过mid，右指针不超出end
        while (left <= mid && right <= end) {
            if (temp[left] <= temp[right]) {
                arr[index++] = temp[left++];
            } else {
                arr[index++] = temp[right++];
            }
        }
        // 最后一种情况，数组被从中间分开，mid会分到左边，那么排序后右边一定不会剩余
        while (left <= mid) {
            arr[index++] = temp[left++]
        }
    }
}
```


## 测试用例
```js
let arr = [1, 3, 4, 1, 5]
console.log(mergeSort(arr))
// 输出[1, 1, 3, 4, 5 ]
```

### time
时间复杂度： nlog(n) [整个二叉树有log(n)层，每层返回合并一次，时间是n，所以是n * log(n)]
### space
空间复杂度：因为拆分和合并，都是DFS，遵循冯诺伊曼体系。 0(n/2 + n/4 + n/8 + ...... + 1) = O(n)