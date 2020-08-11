/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * - 用集合对nums1去重
 * - 遍历nums1，少选出nums2也包含的值
 */
var intersection = function (nums1, nums2) {
  return [...new Set(nums1)].filter(n => nums2.includes(n));
};