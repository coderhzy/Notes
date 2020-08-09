## 111. 二叉树的最小深度
[111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

## 描述

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 [3,9,20,null,null,15,7],

``` JS
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度  2.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-depth-of-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 求最小深度，考虑使用广度优先遍历
- 在广度优先遍历过程中，遇到叶子节点，停止遍历，返回节点层级。


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
```



## 测试用例
![20200809124527](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200809124527.png)
### time
时间复杂度: O(n)
### space
空间复杂度: O(n)