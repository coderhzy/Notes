const bt = require('../../bt');

// 左 根 右
const inorder = (root) => {
  if (!root) { return; }
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}

inorder(bt);