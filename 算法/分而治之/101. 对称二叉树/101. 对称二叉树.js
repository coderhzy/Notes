/**
 * 101. 对称二叉树-解题思路
 * 1. 转换为： 左右子树是否镜像
 * 2. 分解为： 树1的左子树和树2的右子树是否镜像，树1的右子树和树2的左子树是否镜像
 * 
 * 解题步骤
 * 1. 分：获取两个树的左子树和右子树
 * 2. 解： 递归判断树1的左子树和树2的右子树是否镜像，树1的右子树和树2的左子树是否镜像
 * 3. 合： 如果上述都成立，且根节点值也相同，两个树就镜像
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) { return true; }
  const isMirror = (l, r) => {
    if (!l && !r) { return true; }
    //判断是否镜像对称
    if (l && r && l.val === r.val &&
      isMirror(l.left, r.right) &&
      isMirror(l.right, r.left)
    ) {
      return true;
    }
    return false;
  };

  return isMirror(root.left, root.right); // 左右子树
};