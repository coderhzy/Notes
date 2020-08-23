## 101. 对称二叉树
[101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

## 描述

给定一个二叉树，检查它是否是镜像对称的。



``` JS
例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3
```

 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/symmetric-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路


101. 对称二叉树-解题思路
1. 转换为： 左右子树是否镜像
2. 分解为： 树1的左子树和树2的右子树是否镜像，树1的右子树和树2的左子树是否镜像

解题步骤
1. 分：获取两个树的左子树和右子树
2. 解： 递归判断树1的左子树和树2的右子树是否镜像，树1的右子树和树2的左子树是否镜像
3. 合： 如果上述都成立，且根节点值也相同，两个树就镜像


## 代码

``` JS

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
```



## 测试用例
![20200819112714](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200819112714.png)
### time
时间复杂度：O(n)
### space
空间复杂度: O(n)