## 94. 二叉树的中序遍历
[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

## 描述

给定一个二叉树，返回它的中序 遍历。

示例:

``` JS
输入: [1,null,2,3]
   1
    \
     2
    /
   3
```


输出: [1,3,2]
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-inorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 左根右
- 递归和迭代


## 代码

``` JS
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const { right } = require('../bt');

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 递归
 */
var inorderTraversal = function (root) {
  const res = [];
  const rec = (n) => {
    if (!n) return;
    rec(n.left); // 左
    res.push(n.val); // 根
    rec(n.right); // 右
  };
  rec(root);
  return res;
};





/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 迭代
 */
var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let p = root;
  while (stack.length || p) {
    // 将所有左节点push进去
    while (p) {
      stack.push(p);
      p = p.left;
    }
    // 访问，将尽头左节点出栈
    const n = stack.pop();
    res.push(n.val);
    // 访问右节点
    p = n.right;
  }
  return res;
};
```


## 测试用例
![20200810094120](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200810094120.png)
### time
时间复杂度： O(n)
### space
空间复杂度: O(n)