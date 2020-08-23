/**
 * 爬楼梯解题思路：
 * 1. 爬到第n阶可以在第n-1阶爬1个台阶，或者n-2阶爬2个台阶
 * 2. F(n) = F(n-1) + F(n-2)
 * 3. 使用动态规划
 *
 * 解题步骤：
 * 1. 定义子问题： F(n) = F(n-1) + F(n-2)
 * 2. 反复执行： 从2循环到n，执行上述公式
 * 
 * 时间复杂度： O(n)
 * 空间复杂度： O(1)
 */

/**
* @param {number} n
* @return {number}
*/
var climbStairs = function (n) {
  if (n < 2) { return 1; }
  let dp0 = 1;
  let dp1 = 1;
  // const dp = [1, 1]; // 定义一个数组，0阶是1，一阶也是1 
  for (let i = 2; i <= n; i++) {
    // dp[i] = dp[i - 1] + dp[i - 2];
    const temp = dp0;
    dp0 = dp1; //倒数第二个元素变成倒数第一个元素
    dp1 = dp1 + temp; // 新的dp1就是dp1 + dp0
  }
  // return dp[n];
  return dp1;
};