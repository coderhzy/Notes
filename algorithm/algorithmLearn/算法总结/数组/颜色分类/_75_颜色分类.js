/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    /*
     * 一个只包含0，1，2的数组，要求对它进行原地排序
     * 你能相处一个仅使用常数空间对一趟扫描算法吗？ 
     * 
     * 扫描一遍，考虑双指针和三指针
     * 要求： 空间复杂度O(1)，时间复杂度O(n)
     */
    let i = 0,
        j = 0,
        r = nums.length - 1;
    // 定义三个指针，两个位于数组开头，一个位于数组结尾
    while (i <= r) {
        let v = nums[i];
        if (v == 0) {
            swap(nums, i++, j++)
        } else if (v == 1) {
            i++;
        } else {
            swap(nums, i, r--)
        }
    }
    return nums;

    function swap(nums, i, j) {
        let temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }
};

let nums = [0, 2, 1, 0, 2, 1];
console.log(sortColors(nums))