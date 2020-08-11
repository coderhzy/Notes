## 76. 最小覆盖子串
[76. 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

## 描述

给你一个字符串 S、一个字符串 T 。请你设计一种算法，可以在 O(n) 的时间复杂度内，从字符串 S 里面找出：包含 T 所有字符的最小子串。

 

示例：

输入：S = "ADOBECODEBANC", T = "ABC"
输出："BANC"
 

提示：

如果 S 中不存这样的子串，则返回空字符串 ""。
如果 S 中存在这样的子串，我们保证它是唯一的答案。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-window-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 找到包含T的所有所有子串
- 返回最短

## 代码

``` JS
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 * 1. 用双指针维护一个滑动窗口
 * 2. 移动右指针，找到包含T的子串，移动左指针，尽量减少包含T的子串的长度
 * 3. 循环上述操作，返回最小子串。
 */
var minWindow = function (s, t) {
  let l = 0;
  let r = 0;
  const need = new Map();
  // 遍历出 滑动窗口需要的字符
  for (let c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }
  let needType = need.size;
  let res = '';
  while (r < s.length) {
    const c = s[r];
    if (need.has(c)) {
      need.set(c, need.get(c) - 1);
      if (need.get(c) === 0) needType -= 1;
    }
    while (needType === 0) {
      // 循环中不断刷新res
      const newRes = s.substring(l, r + 1);
      if (!res || newRes.length < res.length) res = newRes;
      const c2 = s[l];
      if (need.has(c2)) {
        // 移动左指针以后，就需要我们是否要增加需求
        need.set(c2, need.get(c2) + 1);
        if (need.get(c2) === 1) needType += 1;
      }
      // 开始动左指针,尝试减小子串长度
      l += 1;
    }
    // 移动右指针
    r += 1;
  }
  return res;
};
```

## 测试用例
![20200808060152](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200808060152.png)
### time
时间复杂度: O(m+n)，m是t的长度，n是s的长度
### space
空间复杂度: O(m),m是t中不同字符的个数