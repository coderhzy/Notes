/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 * 1. 深度遍历二叉树，在叶子节点处，判断当前路径的节点值的和是否等于目标值，是就返回true
 * 2. 遍历结束，如果没有匹配，就返回false
 */
var hasPathSum = function (root, sum) {
  if (!root) return false;
  // 深度优先遍历并记录值
  let res = false;
  const dfs = (n, s) => {
    // 判断是否为叶子节点已经总和
    if (!n.left && !n.right && s === sum) {
      res = true;
    }
    if (n.left) dfs(n.left, s + n.left.val);
    if (n.right) dfs(n.right, s + n.right.val);
  }
  dfs(root, root.val);
  return res;
};