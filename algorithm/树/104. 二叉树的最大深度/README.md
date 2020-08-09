## 104. 二叉树的最大深度
[104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

## 描述


给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

``` JS
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

## 思路

- 求最大深度，考虑使用深度优先遍历
- 在深度优先遍历过程中，记录每个节点所在的层级，找出最大的层级即可

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
```



## 测试用例
![20200809120513](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200809120513.png)
### time
时间复杂度: O(n)
### space
空间复杂度: 最好: O(logn) 最坏: O(n)