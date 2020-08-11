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