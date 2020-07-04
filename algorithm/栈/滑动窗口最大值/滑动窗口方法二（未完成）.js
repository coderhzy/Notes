/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 *
 */
function maxSlidingWindow(nums, k) {
    if (nums == null || nums.length == 0 | k < 1) return null;
    if (k == 1) return nums;
    // 滑动窗口
    let maxes = [nums.length - k + 1];

    // 当前滑动窗口最大值索引
    let maxIndex = 0;
    //  求出前k个元素的最大值索引
    for (let i = 1; i < k; i++) {
        if (nums[i] > nums[maxIndex]) maxIndex = i;
    }

    //  leftIndex是滑动窗口的最左索引
    for (let leftIndex = 0; leftIndex < maxes.length; leftIndex++) {
        // rightIndex是滑动窗口最右索引
        let rightIndex = leftIndex + k - 1;
        // 判断最大值的索引是否在有效的滑动窗口内
        if (maxIndex < leftIndex) { // 不在合理范围内
            // 将新的有效窗口最左侧设置为最大值，然后跟后面的值进行比较
            maxIndex = leftIndex;
            // 当滑动窗口左侧最大值索引失效，需要重新扫描新的数组 [leftIndex,rightIndex]
            for (let i = leftIndex + 1; i <= rightIndex; i++) {
                5
                if (nums[i] > nums[maxIndex]) maxIndex = i;
            }
        } else if (nums[rightIndex] >= nums[maxIndex]) {
            // 当最大值的索引在滑动窗口的合理范围吧内
            maxIndex = rightIndex;
        }
        maxes[leftIndex] = nums[maxIndex];
    }
    return maxes;
};
