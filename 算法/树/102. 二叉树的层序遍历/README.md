## 102. 二叉树的层序遍历
[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

## 描述

给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

 

示例：
二叉树：[3,9,20,null,null,15,7],

``` JS
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

[
  [3],
  [9,20],
  [15,7]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 层序遍历顺序就是广度优先遍历
- 不过在遍历时候需要记录当前节点所处层级，方便将其添加到不同的数组中。

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
```



## 测试用例
![20200810091723](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200810091723.png)
### time
时间复杂度: O(n)
### space
空间复杂度: O(n)