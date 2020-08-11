/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const { right } = require('../bt');

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 递归
 */
var inorderTraversal = function (root) {
  const res = [];
  const rec = (n) => {
    if (!n) return;
    rec(n.left); // 左
    res.push(n.val); // 根
    rec(n.right); // 右
  };
  rec(root);
  return res;
};





/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 迭代
 */
var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let p = root;
  while (stack.length || p) {
    // 将所有左节点push进去
    while (p) {
      stack.push(p);
      p = p.left;
    }
    // 访问，将尽头左节点出栈
    const n = stack.pop();
    res.push(n.val);
    // 访问右节点
    p = n.right;
  }
  return res;
};