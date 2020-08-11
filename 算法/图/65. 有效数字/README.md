## 65. 有效数字
[65. 有效数字](https://leetcode-cn.com/problems/valid-number/)

## 描述

验证给定的字符串是否可以解释为十进制数字。

例如:

``` JS
"0" => true
" 0.1 " => true
"abc" => false
"1 a" => false
"2e10" => true
" -90e3   " => true
" 1e" => false
"e3" => false
" 6e-1" => true
" 99e2.5 " => false
"53.5e93" => true
" --6 " => false
"-+3" => false
"95a54e53" => false
```


说明: 我们有意将问题陈述地比较模糊。在实现代码之前，你应当事先思考所有可能的情况。这里给出一份可能存在于有效十进制数字中的字符列表：

数字 0-9
指数 - "e"
正/负号 - "+"/"-"
小数点 - "."
当然，在输入中，这些字符的上下文也很重要。

更新于 2015-02-10:
C++函数的形式已经更新了。如果你仍然看见你的函数接收 const char * 类型的参数，请点击重载按钮重置你的代码。

通过次数17,274提交次数84,311

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路


![20200811085429](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200811085429.png)

- 构建一个表示状态的图
- 遍历字符串中每一个字符，并沿着图走，如果到了某个节点无路可走就返回false
- 遍历结束，如果走到状态3/5/6，就返回true，否则返回false


## 代码

``` JS
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
```


## 测试用例
![20200811103814](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200811103814.png)
### time
时间复杂度: O(n)
### space
空间复杂度: O(1)