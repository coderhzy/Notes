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