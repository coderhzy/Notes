## 133. 克隆图
[133. 克隆图](https://leetcode-cn.com/problems/clone-graph/)

## 描述

给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。

图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。

``` JS
class Node {
    public int val;
    public List<Node> neighbors;
}
```

 

测试用例格式：

简单起见，每个节点的值都和它的索引相同。例如，第一个节点值为 1（val = 1），第二个节点值为 2（val = 2），以此类推。该图在测试用例中使用邻接列表表示。

邻接列表 是用于表示有限图的无序列表的集合。每个列表都描述了图中节点的邻居集。

给定节点将始终是图中的第一个节点（值为 1）。你必须将 给定节点的拷贝 作为对克隆图的引用返回。

 

示例 1：

![20200812080530](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200812080530.png)

``` JS
输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
输出：[[2,4],[1,3],[2,4],[1,3]]
解释：
图中有 4 个节点。
节点 1 的值是 1，它有两个邻居：节点 2 和 4 。
节点 2 的值是 2，它有两个邻居：节点 1 和 3 。
节点 3 的值是 3，它有两个邻居：节点 2 和 4 。
节点 4 的值是 4，它有两个邻居：节点 1 和 3 。
```

示例 2：

![20200812080609](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200812080609.png)

``` JS
输入：adjList = [[]]
输出：[[]]
解释：输入包含一个空列表。该图仅仅只有一个值为 1 的节点，它没有任何邻居。
```

示例 3：

``` JS
输入：adjList = []
输出：[]
解释：这个图是空的，它不含任何节点。
```

示例 4：

![20200812080635](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200812080635.png)

``` JS
输入：adjList = [[2],[1]]
输出：[[2],[1]]
```

 

提示：

节点数不超过 100 。
每个节点值 Node.val 都是唯一的，1 <= Node.val <= 100。
无向图是一个简单图，这意味着图中没有重复的边，也没有自环。
由于图是无向的，如果节点 p 是节点 q 的邻居，那么节点 q 也必须是节点 p 的邻居。
图是连通图，你可以从给定节点访问到所有节点。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/clone-graph
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 拷贝所有节点
- 拷贝所有的边

- 深度或广度优先遍历所有节点
- 拷贝所有的节点，存储起来
- 将拷贝的节点，按照原图的连接方法进行连接


## 代码

``` JS
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 * 深度优先遍历
 * 1. 深度克隆图的所有节点（包括邻居节点）
 * 2. 返回克隆后的首节点
 */
var cloneGraph = function (node) {
  if (!node) return;
  const visited = new Map();
  const dfs = (n) => {
    // 拷贝节点
    const nCopy = new Node(n.val);
    // 记录映射关系
    visited.set(n, nCopy);
    // 深度优先遍历
    (n.neighbors || []).forEach(ne => {
      if (!visited.has(ne)) {
        dfs(ne);
      }
      // 拿到被克隆的邻居节点
      nCopy.neighbors.push(visited.get(ne));
    });
  };
  dfs(node);
  // 将起始节点的克隆返回
  return visited.get(node);
};




/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 * 广度优先遍历
 */
var cloneGraph = function (node) {
  if (!node) return;
  const visited = new Map();
  visited.set(node, new Node(node.val));
  const q = [node];
  while (q.length) {
    const n = q.shift();
    (n.neighbors || []).forEach(ne => {
      if (!visited.has(ne)) {
        q.push(ne);
        visited.set(ne, new Node(ne.val));
      }
      // 拷贝边
      visited.get(n).neighbors.push(visited.get(ne));
    })
  }
  return visited.get(node);
};
```



## 测试用例
![20200812092336](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200812092336.png)
### time
深度优先遍历-时间复杂度: O(n)
广度优先遍历-时间复杂度: O(n)
### space
深度优先遍历-空间复杂度: O(n)
广度优先遍历-空间复杂度: O(n)