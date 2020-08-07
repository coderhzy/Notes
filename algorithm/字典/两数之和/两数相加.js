/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 字典 - 婚姻介绍所
 */
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const n2 = target - n;
    if (map.has(n2)) {
      return [map.get(n2), i];
    } else {
      map.set(n, i);
    }
  }
};