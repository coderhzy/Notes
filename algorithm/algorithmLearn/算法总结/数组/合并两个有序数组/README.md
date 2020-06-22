## 合并两个有序数组
[88.合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

## 描述

给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

**说明:**

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 

**示例:**

输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

## 思路

- 分别定义三个指针，指针i1指向nums1数组 m-1 位,指针i2指向nums2数组 n-1位,指针cur 指向数组nums1的 enght-1 位。
- 利用归并排序的思想，比较i和j位置数字，谁大移动谁
- 当j为负数则退出循环

## 代码

```js
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
            i--;
        }
    }
    return nums1
};
```


## 测试用例
```js
let nums1 = [1, 2, 3, 0, 0, 0],
    m = 3,
    nums2 = [2, 5, 6],
    n = 3
console.log(mergeSort(nums1, m, nums2, n));
// [ 1, 2, 2, 3, 5, 6 ]
```
### time
- nums1数组需要n次，nums2数组需要m次。
- 时间复杂度为O(n+m)
### space
- 空间复杂度 : O(1)