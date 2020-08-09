// 先序入栈 -> 出栈
const bt = require('../../bt');

const postorder = (root) => {
  if (!root) { return; }
  const outputStack = [];
  const stack = [root];
  while (stack.length) {
    // 推入栈
    const n = stack.pop();
    outputStack.push(n);
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  // 倒序输出
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
};

postorder(bt);