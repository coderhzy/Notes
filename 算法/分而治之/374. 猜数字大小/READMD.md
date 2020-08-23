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

解题思路
- 二分搜索，同样具备 ” 分、解、 合“的特性
- 考虑选择分而治之

## 代码

``` JS
/**
 * 猜数字大小解题步骤
 * 1. 分：计算中间元素，分割数组
 * 2. 解：递归地在较大或较小子数组进行二分搜索
 * 3. 合：不需要此步，因为在子数组搜到就返回了
 * 
 * 时间复杂度：O(logN)
 * 空间复杂度: O(logN)
 */


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
  const rec = (low, high) => {
    if (low > high) { return; } // 递归终结条件
    const mid = Math.floor((low + high) / 2);
    const res = guess(mid);
    if (res === 0) {
      return mid;
    } else if (res === 1) {
      return rec(mid + 1, high); // 数字较大
    } else {
      return rec(1, mid - 1); // 数组较小
    }
  }

  // 1,n代表搜索范围
  return rec(1, n);
};
```




## 测试用例

### time
 * 时间复杂度：O(logN)
### space
 * 空间复杂度: O(logN)