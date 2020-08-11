/**
 * 1. 新建一个队列，把根节点入队
 * 2. 把队头出队并访问
 * 3. 把对头的没有访问过的相邻节点入队
 * 4. 重复第二、第三步，直到队列为空
 */

const gtaph = require('./graph');
const graph = require('./graph');

const visited = new Set();
visited.add(2);
const q = [2];
while (q.length) {
  const n = q.shift();
  console.log(n);
  graph[n].forEach(c => {
    if (!visited.has(c)) {
      q.push(c);
      visited.add(c);
    }
  })
}