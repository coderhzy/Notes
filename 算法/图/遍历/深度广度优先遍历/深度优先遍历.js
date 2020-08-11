/**
 * 1. 访问根节点
 * 2. 对节点的没有访问过的相邻节点挨个进行深度优先遍历
 */

const graph = require('./graph');

const visited = new Set();
const dfs = (n) => {
  console.log(n);
  visited.add(n);
  // 遍历n的相邻节点
  graph[n].forEach(c => {
    if (!visited.has(c)) {
      dfs(c);
    }
  });
};

dfs(2);