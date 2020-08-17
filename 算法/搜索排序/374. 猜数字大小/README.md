## 374. 猜数字大小
[374. 猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)

## 描述

猜数字游戏的规则如下：

每轮游戏，系统都会从 1 到 n 随机选择一个数字。 请你猜选出的是哪个数字。
如果你猜错了，系统会告诉你，你猜测的数字比系统选出的数字是大了还是小了。
你可以通过调用一个预先定义好的接口 guess(int num) 来获取猜测结果，返回值一共有 3 种可能的情况（-1，1 或 0）：

-1 : 你猜测的数字比系统选出的数字大
 1 : 你猜测的数字比系统选出的数字小
 0 : 恭喜！你猜对了！
 

示例 :

输入: n = 10, pick = 6
输出: 6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/guess-number-higher-or-lower
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

猜数字大小-解题思想
- 二分搜索
- 调用guess函数，来判断中间函数是否是目标值

猜数字大小-解题步骤
- 从数组的中间元素开始，如果中间元素正好是目标值，则搜索过程结束。
- 如果目标值大于或者小于元素，则数组大于或者小于中间元素的那一半中查找。



## 代码

``` JS



/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let low = 1;
  let high = n;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2); // 中间值
    const res = guess(mid);
    if (res === 0) {
      return mid;
    } else if (res === 1) {
      low = mid + 1; // 在较大的一半
    } else {
      high = mid - 1; // 在较小的一半
    }
  }
};
```



## 测试用例
![20200816230640](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200816230640.png)
### time
时间复杂度：O(logN)

### space
空间复杂度: O(1)