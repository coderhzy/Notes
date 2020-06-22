/* 第一题：
88. 合并两个有序数组
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。输入:

nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6] */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var mergeSort = function(nums1, m, nums2, n) {
    // nums1 = [1, 2, 3, 0, 0, 0], m = 3
    // nums2 = [2, 5, 6], n = 3
    let i1 = m - 1,
        i2 = n - 1,
        cur = nums1.length - 1;
    while (i2 >= 0) {
        // 比较谁小谁移动
        if (i1 >= 0 && nums2[i2] < nums1[i1]) {
            nums1[cur] = nums1[i1];
            cur--;
            i1--;
        } else { // i1 < 0 || nums2[i2] >= num1[i1]
            nums1[cur] = nums2[i2];
            cur--;
            i2--;
        }
    }
    return nums1
};

let nums1 = [1, 2, 3, 0, 0, 0],
    m = 3,
    nums2 = [2, 5, 6],
    n = 3
console.log(mergeSort(nums1, m, nums2, n));