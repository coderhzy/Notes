## 100. 相同的树
[100. 相同的树](https://leetcode-cn.com/problems/same-tree/)

## 描述

给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

``` JS
示例 1:

输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
示例 2:

输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
示例 3:

输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/same-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


## 思路

解题思路
1. 两个树：根节点的值相同，左子树相同，右子树相同。
2. 符合“分解合”特性
3. 考虑分而治之

解题步骤
1. 分： 获取两个树的左子树和右子树
2. 解： 递归地判断两个树的左子树是否相同，右子树是否相同
3. 合： 将上述结果合并，如果根节点的值也相同，树就相同


## 代码

``` JS


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) { return true; }
  if (p && q && p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  ) {
    return true;
  }
  return false;
};
```


## 测试用例
![20200819110318](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200819110318.png)
### time
时间复杂度： O(n)
### space
空间复杂度: O(n) 