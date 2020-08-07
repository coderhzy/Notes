## 3. 无重复字符的最长子串
[3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

## 描述

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 先找出所有不包含重复字符的子串
- 找出长度最大的那个子串，返回其长度即可

## 代码

``` JS
/**
 * @param {string} s
 * @return {number}
 * 1. 用双指针维护一个滑动窗口，来剪切子串
 * 2. 不断移动右指针，遇到重复字符，就把做指针移动到重复字符的下一位。
 * 3. 过程中，记录所有窗口的长度，并且返回最大值
 */
var lengthOfLongestSubstring = function (s) {
  let l = 0;
  let res = 0;
  const map = new Map();
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r]) && map.get(s[r]) >= l) {
      // 将左指针移动到当前位置的下一个位置
      l = map.get(s[r]) + 1;
    }
    //  取得最大不重复字符串的最大长度
    res = Math.max(res, r - l + 1);
    // 设置字典
    map.set(s[r], r);
  }
  return res;
};
```



## 测试用例
![20200807100001](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200807100001.png)
### time
时间复杂度: O(n)
### space
空间复杂度: O(m)     m = 字典中不重复的字符的个数。