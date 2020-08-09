/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 1. 新建一个变量，记录最大深度
 * 2. 深度优先遍历整棵树，并记录每个节点的层级，同时不断刷新最大深度这个变量
 * 3. 最终返回这个变量
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  let res = 0;
  const dfs = (n, l) => {
    if (!n) { return; }
    // 提升性能，判断是否是叶子节点
    if (!n.left && !n.right) {
      res = Math.max(res, l);
    }
    dfs(n.left, l + 1);
    dfs(n.right, l + 1);
  };
  // 初始层级是1
  dfs(root, 1);
  return res;
};