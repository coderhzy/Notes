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

- 求nums1个nums2的值
- 用字典简历一个映射关系，记录nums1中有的值
- 遍历nums2，找出nums1中也有的值

## 代码

``` JS
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
```


## 测试用例
![20200807072516](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200807072516.png)
### time
时间复杂度： 假设nums1.length为m，nums2.length为n。 时间复杂度： O(m+n) 
### space
空间复杂度： 空间复杂度O(m)