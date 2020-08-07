/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 
 * 1. 新建一个字典，遍历nums1，填充字典
 * 2. 遍历nums2，遇到字典的值就选出，并从字典中删除
 */
var intersection = function (nums1, nums2) {
  const map = new Map();
  nums1.forEach(n => {
    map.set(n, true);
  });
  const res = [];
  nums2.forEach(n => {
    if (map.get(n)) {
      res.push(n);
      map.delete(n);
    }
  });
  return res;
};