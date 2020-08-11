/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 * 1. 广度优先遍历二叉树
 * 2. 遍历过程中，记录每个节点的层级，并将其添加到不同的数组中
 */
var levelOrder = function (root) {
  if (!root) return [];
  const q = [root];
  // res最终导出的大数组
  const res = [];
  while (q.length) {
    let len = q.length;
    // 每一层push进一个新数组
    res.push([]);
    while (len--) {
      const n = q.shift();
      // 每次循环拿到最后一个数组进行添加值
      res[res.length - 1].push(n.val);
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
  }
  return res;
};