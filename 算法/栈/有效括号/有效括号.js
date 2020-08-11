/**
 * @param {string} s
 * @return {boolean}
 * - 新建一个栈
 * - 扫描字符串，遇左括号入栈，遇到和栈顶括号类型匹配的有括号就出栈，类型不匹配直接判定为不合法。
 * - 最后栈空了，否则不合法。优化判断是否长度为奇数
 */
var isValid = function(s) {
  if( s.length % 2 === 1) { return false;}
  const stack = [];
  // 遍历
  for( let i = 0; i < s.length; i++) {
    const letter = s[i];
    if(letter === '(' || letter === '{' || letter === '['){
      stack.push(letter);
    }else{
      // 栈顶元素
      const top = stack[stack.length  - 1];
      if( 
        (top === '(' && letter === ')') ||
        (top === '{' && letter === '}') ||
        (top === '[' && letter === ']')
        ) {
          // 弹出栈顶元素
          stack.pop();
        } else {
          return false;
        }
    }
  }
  return stack.length === 0;
};