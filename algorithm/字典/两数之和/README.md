## 1. 两数之和
[1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

## 描述

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

 

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 把nums想象成相亲对象。
- 把target想象成匹配条件。
- 用字典简历一个婚姻介绍所，存储相亲者的数组和下标。


## 代码

``` JS
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
```



## 测试用例
![20200807082319](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200807082319.png)
### time
时间复杂度：O(n)
### space
空间复杂度: O(n)