## 112. 路径总和
[112. 路径总和](https://leetcode-cn.com/problems/path-sum/)

## 描述

给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明: 叶子节点是指没有子节点的节点。

``` JS
示例: 
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
```

返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 在深度优先遍历的过程中，记录当前路径的节点值的和
- 在叶子节点处，判断当前路径的节点值的和是否等于目标值


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
```



## 测试用例
![20200810101657](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200810101657.png)
### time
时间复杂度: O(n)
### space
空间复杂度: 最坏：O(n) 最好： O(log(n))