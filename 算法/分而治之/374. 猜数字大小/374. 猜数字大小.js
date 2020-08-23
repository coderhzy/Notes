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