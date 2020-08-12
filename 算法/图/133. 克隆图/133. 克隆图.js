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