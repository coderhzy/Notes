/**
 * 解题思路
 * 1. 先翻转左右子树，在将子树换个位置
 * 2. 符合“分解合”
 * 3. 考虑分而治之
 * 
 * 解题步骤
 * 1. 分： 获取左右子树
 * 2. 解： 递归地翻转左右子树
 * 3. 合： 将翻转的左右子树换个位置放到根节点上
 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) { return null; }
  return {
    val: root.val,
    left: invertTree(root.right), // 获取子树并交换
    right: invertTree(root.left), // 获取子树并交换
  }
};