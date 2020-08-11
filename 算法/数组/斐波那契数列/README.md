## 斐波那契数列
[509. 斐波那契数](https://leetcode-cn.com/problems/fibonacci-number/)

## 描述

斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
给定 N，计算 F(N)。

 

示例 1：

输入：2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1.
示例 2：

输入：3
输出：2
解释：F(3) = F(2) + F(1) = 1 + 1 = 2.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/fibonacci-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 后面数等于前两个数相加之和

## 代码
```js
// 斐波那契数列
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    if (N <= 1) return N;
    let first = 0,
        second = 1;
    for (let i = 0; i < N - 1; i++) {
        second += first;
        first = second - first;
    }
    return second;
};
```


## 测试用例
![20200701090814](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200701090814.png)
### time
时间复杂度：O(n)
### space
空间复杂度: O(1)