/**
 * @param {string} s
 * @return {boolean}
 * - 构建一个表示状态的图
 * - 遍历字符串中每一个字符，并沿着图走，如果到了某个节点无路可走就返回false
 * - 遍历结束，如果走到状态3/5/6，就返回true，否则返回false
 */
var isNumber = function (s) {
  // 构件图
  const graph = {
    0: { blank: 0, sign: 1, ".": 2, digit: 6 },
    1: { digit: 6, ".": 2 },
    2: { digit: 3 },
    3: { digit: 3, e: 4 },
    4: { digit: 5, sign: 7 },
    5: { digit: 5 },
    6: { digit: 6, ".": 3, e: 4 },
    7: { digit: 5 },
  };

  // 遍历字符串
  let state = 0;
  for (c of s.trim()) {
    if (c >= '0' && c <= '9') {
      c = 'digit';
    } else if (c === ' ') {
      c = 'blank';
    } else if (c === '+' || c === '-') {
      c = 'sign';
    }
    // 新状态
    state = graph[state][c];
    if (state === undefined) { return false; }
  }
  // 判断ture
  if (state === 3 || state === 5 || state === 6) {
    return true;
  }
  return false;
};