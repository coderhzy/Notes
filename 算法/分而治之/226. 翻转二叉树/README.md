## 226. 翻转二叉树
[226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

## 描述

翻转一棵二叉树。

``` JS
示例：

输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/invert-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

解题思路
1. 先翻转左右子树，在将子树换个位置
2. 符合“分解合”
3. 考虑分而治之

解题步骤
1. 分： 获取左右子树
2. 解： 递归地翻转左右子树
3. 合： 将翻转的左右子树换个位置放到根节点上


## 代码

``` JS
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
```



## 测试用例
![20200819101857](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200819101857.png)
### time
时间复杂度：O(n)
### space
空间复杂度： O(h)  h => 树的高度