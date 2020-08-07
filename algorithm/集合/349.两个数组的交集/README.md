##  两个数组的交集
[349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

## 描述

给定两个数组，编写一个函数来计算它们的交集。

 

示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
示例 2：

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
 

说明：

输出结果中的每个元素一定是唯一的。
我们可以不考虑输出结果的顺序。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/intersection-of-two-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 用集合对nums1去重
- 遍历nums1，少选出nums2也包含的值

## 代码

``` JS
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
```


## 测试用例
![20200807065017](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200807065017.png)
### time
时间复杂度： O(m*n)
### space
空间复杂度： 空间复杂度就是返回的数值的长度，O(m)