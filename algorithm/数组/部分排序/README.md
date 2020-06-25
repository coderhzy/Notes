## 部分排序
[面试题 16.16 部分排序](https://leetcode-cn.com/problems/sub-sort-lcci/)

## 描述
给定一个整数数组，编写一个函数，找出索引m和n，只要将索引区间[m,n]的元素排好序，整个数组就是有序的。注意：n-m尽量最小，也就是说，找出符合条件的最短序列。函数返回值为[m,n]，若不存在这样的m和n（例如整个数组是有序的），请返回[-1,-1]。

示例：

输入： [1,2,4,7,10,11,7,12,6,7,16,18,19]
输出： [3,9]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sub-sort-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

提示：
```js
0 <= len(array) <= 1000000
```

**缜密**
- 如果数组为空，那么我们不做任何事情。
- 如果数组的长度为0，那么我们不做任何事情。


## 思路

- 数组左->右 升序。 找到最远的逆序对即可,右->左则反之
- 定义三个指针max，r，i。max存放选取数组0位置，当作最大值。i来扫描数组，将扫描得到的值与max的值对比。如果大于max则将该值赋给max，如果小于则说明是逆序对，用指针r来记录该值的位置。接着扫描到结束。
- 数组右->左则反之，定义min，l，i

## 代码

```js
/**
 * @param {number[]} array
 * @return {number[]}
 */
var subSort = function(array) {
    if (array.length === 0) return [-1, -1]
        // 从左扫描到右，来寻找逆序对(正序逐渐变大)。从右到左则反之。
        // max存储最大值
    let max = array[0];
    // 用来记录最右的那个逆序对位置
    let r = -1;
    // i用来扫描整个数组
    for (let i = 1; i < array.length; i++) {
        // 取出一个数
        let v = array[i];
        // 找到一个大于最大值的数，替换当前最大值。 否则说明是逆序对，标记那个值的位置。 
        // 为了逆序对足够小，等于的时候不标记。
        if (v >= max) {
            max = v
        } else {
            r = i
        }
    }

    if (r == -1) return [-1, -1]

    // 从右扫描到左，来寻找逆序对(正序逐渐变小)
    // min存储最小值
    let min = array[array.length - 1];
    // 用来记录最右的那个逆序对位置
    let l = -1;
    // i用来扫描整个数组
    for (let i = array.length - 2; i >= 0; i--) {
        // 取出一个数
        let v = array[i];
        // 找到一个大于最大值的数，替换当前最大值。 否则说明是逆序对，标记那个值的位置。 
        // 为了逆序对足够小，等于的时候不标记。
        if (v <= min) {
            min = v
        } else {
            l = i
        }
    }
    return [l, r];
}
```

## 测试用例

![20200625114229](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200625114229.png)

### time
时间复杂度:O(n)，无论怎么样都要扫描一遍数组。
### space
空间复杂度:O(n)