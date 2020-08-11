const bt = require('../bt');

// 根 左 右
const preorder = (root) => {
  if (!root) { return; }
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
}

preorder(bt);