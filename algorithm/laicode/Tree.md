## Binary Tree

Definition: at most two children node.
Binary Tree Example:

                10 == root 
               /  \
              5   15
            / \  /  \ 
          2   7  12 20
        /  \
     null null

**工业应用：**
Too many to list all
eg:

* social networks analysis   // 最顶级人员
* information indexing    // 输入法
* information compression  

基础知识点1:tree traverse
(1) pre-order
10 5 2 7 15 12 20
Implementation with recursion:

1. pre-order

                10 == root(cur)
               /  \
             5     15 
            / \    / \ 
            2  7  12  20 < -- -- - all leaf node 's level == 3 
           / \
        null null

真正的叶节点是leafnode下面的空指针

TODO: 完善下方代码

``` js
function perOrder(TreeNode * root) {
    if (root == null) return; // bace case 
    cout << root - > value << endl;
    preOrder(root - > left);
    preOrder(root - > right);
}
```

1. in-order

2 5 7 10 12 15 20

``` js
void inOrder(TreeNode * root) {
    if (root == null) return; //base case;
    InOrder(root - > left);
    cout << root - > value << endl;
    inOrder(root - > right);
}
```

3. post-order

2 7 5 12 20 15 10

``` js
void postOrder(TreeNode * root) {
    if (root == null) return; //base case;
    postOrder(root - > left);
    postOrder(root - > right);
    cout << root - > value << endl;
}
```

<font color=red>Trick:base case usually to the null ChildNode below the leaf node</font>

基础概念
**Balanced binary tree:**
is commonly defined as a binary tree in which the depth of the left and  right substrees of <font color=red>every node</font> differ by 1 or less.

                10 == root
               /   \
             5      15 
            / \    /  \ 
           2 null 12   20

**Complete binary tree:**
is a binary tree in which every level, except possibly the last, is complete filled, and all nodes are as far left as possible.

                10 == root
               /  \
             5     15 
            / \   /   \ 
           2   7 12 null-- > 最后一层尽量靠左

**Binary Search Tree:**
for every single node in the tree, the values in its left subtree are all smaller than its value, and the values in its right subtree are all larger than its value.

                10 == root
               /   \
              5     15 
            /   \   /  \ 
            2    7  12   20

**Discussion (High Level):**

![20200722085608](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200722085608.png)

* Binary tree往往是最常见的, 和recursion 结合最紧密的面试题目类型。
* Reasons:
1. 每层的node具备的特质，传递的值和下一层的性质往往一致。比较容易定义 recursive rule.
2. Base case(generally) : null pointer under the left node
3. Example1: int getHeight(Node root)
4. Example2: 统计tree里面有多个node？
* Fundamental KnowLedge:
1. Traversal of a binary tree
2. Definition

  Balanced binary tree
  Complete binary tree
  Binary search Tree(BST)
**GetHeight of a binary tree:**

``` js
function getHeight(TreeNode root) {
    if (root == null) return 0;
    let left = getHeight(root.left);
    let right = getHegiht(root.right);
    return 1 + Math.max(left, right);
}
// Time = O(n)
// Space = O(n) == O(height)
```

**judge isBalanced**

``` js
  function isBalanced(TreeNode root) {
      if (root == null) return true;
      let left = getHeight(root.left);
      let right = getHeight(root.right);
      if (Math.abs(left - right) > 1) {
          return false
      }
      return isBalanced(root.left) && isBalanced(root.right);
  }
```

``` 
                          isBalanced(root)  O(n/2) + O(n/2) = O(n)

                            /                             \
                            n/2                           n/2
                  isBalanced(root.left)              isBalanced(root.right) = O(n)
                  O(n/4) + O(n/4)                     O(n/4) + O(n/4)
logn level: Time = O(nlogn)
```

**Question1:**
How to determine a binary tree is a balanced binary tree?
<font color=red>(This is NOT an optimal solution)</font>

``` js
  function isBalanced(TreeNode root) {
      if (root == null) return true;
      let left = getHeight(root.left);
      let right = getHeight(root.right);
      if (Math.abs(left - right) > 1) {
          return false
      }
      return isBalanced(root.left) && isBalanced(root.right);
```

**Question2:**
How to judge whether a binary is symmetric?

``` 
                    10
                  5a | 5b
              1a  3a | 3b  1b
          2a  4a  8a | 8b  4b 2b
```

``` js
function IsSymmetric(TreeNode one, TreeNode two) {
    if (one.value == null && two.value == null) {
        return true; // base case 1
    } else if (one.value == null || two.value != null) {
        return false; // base case 2
    } else if (one.value != two.value) {
        return false;
    }
    return IsSymmetric(one.left, two.right) && IsSymmetric(one.right, two.left)
}
// Time = O(n)
// Space = O(n) -> O(height)   if the tree is balanced -> O(log(n))
```

**Question:**
Let's assume if we tweak the lchild of an arbitary node in a binary tree, then the "structure" of the tree are not changed. Then how can we determine whether two binary trees structures are identical.

![20200723085828](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200723085828.png)

``` js
function isIdentical(TreeNode one, TreeNode two) {
    if (one.value == null && two.value == null) {
        return true; // base case 1
    } else if (one.value == null || two.value != null) {
        return false; // base case 2
    } else if (one.value != two.value) {
        return false;
    }
    // recursive rule
    return (isIdentical(one.left, two.left) && isIdentical(one.right, two.right)) || (isIdentical(one.right, two.left));
}
```

![20200723102821](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200723102821.png)

if the original tree has log_2(n) (Assume that were balanced...) then the recursion tree(quadral tree is also log_2(n)).

binary tre : 1 2 4 8 16 32 .....
quadral tree: 1 4 16 64 256 ..... // 最后一层叶节点大于上面所有层相加

1 4^1 4^2 4^3   how many levels in this tree? 4^(log_2(n))

Time complexity = O(4^(log_2(n))) = 2^(2log_2(n)) = 2^(log_2(n^2)) = O(n^2).

**Binary Search Tree:**
经典例题1: How to determine a binary tree is a BST ?

Primitive idea: for each node, check all its left-subtree, to determine whether they are all smaller check all its right-subtree, to determine whether they are all larger.

![20200724084528](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200724084528.png)

``` js
function isBSTHelper(TreeNode root = 10, min, max) {
    if (root == null) return false;
    if (root.value < min || root.value > max) return false;
    Return isBSTHelper(root.left, min, root.value) && isBSTHelper(root.right, root.value, max);
}
```

经典例题2:
Given two values k1 and k2(where k1 < k2) and a root pointer to a Binary Search Tree. Print all the keys of tree range k1 to k2 . print all x such that k1 <= x <= k2 and x is a key of given BST. Print all the keys in an increasing order.
[k1 = 16, k2 = 36]; 
Property: For BST, if we print out all elements an in-order squence, then they satisfy that they are printed in an increasing order.

                        10  == root
                       /   \
                     5      15          [k1=16,k2=17]
                    /  \    /  \ 
                   2   7   11  20 
                               /  \
                              18    25
                              /
                            17

<font color=red>if(cur.value > k1)</font>
<font color=red>if(cur.value < k2)</font>

``` js
function inOrder(TreeNode root, k1, k2) {
    if (root == null) {
        return;
    }
    if (root.value > k1) {
        inOrder(root.left, k1, k2)
    }
    if (root.value >= k1 && root.value <= k2) {
        console.log(root.value);
    }
    if (root.value < k2) {
        inOrder(root.right, k1, k2);
    }
}
```
