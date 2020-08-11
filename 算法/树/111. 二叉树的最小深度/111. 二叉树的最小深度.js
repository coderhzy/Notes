/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 
 * 1. 广度优先遍历整个树，并记录每个节点的层级
 * 2. 遇到叶子节点，返回节点层级，停止遍历
 * 
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) { return 0; }
  // 队列
  const q = [[root, 1]];
  while (q.length) {
    const [n, l] = q.shift();
    // 判断是否为叶子节点
    if (!n.left && !n.right) {
      return l;
    }
    if (n.left) q.push([n.left, l + 1]);
    if (n.right) q.push([n.right, l + 1]);
  }
};