/**
 * 374. 猜数字大小-解题思想
 * 1. 二分搜索
 * 2. 调用guess函数，来判断中间函数是否是目标值
 * 
 * 374. 猜数字大小-解题步骤
 * 1. 从数组的中间元素开始，如果中间元素正好是目标值，则搜索过程结束。
 * 2. 如果目标值大于或者小于元素，则数组大于或者小于中间元素的那一半中查找。
 * 
 * 时间复杂度：O(logN)
 * 
 * 空间复杂度: O(1)
 * 
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