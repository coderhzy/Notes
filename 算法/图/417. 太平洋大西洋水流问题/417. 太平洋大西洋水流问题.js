/**
 * @param {number[][]} matrix
 * @return {number[][]}
 * - 新建两个矩阵，分别记录能流到两个大洋的坐标
 * - 从海岸线，多管齐下，同时深度优先遍历，过程中填充上述矩阵
 * - 遍历两个矩阵，找出能流到两个大洋的坐标
 */
var pacificAtlantic = function (matrix) {
  if (!matrix || !matrix[0]) { return []; }
  // m n 矩阵行数 列数
  const m = matrix.length;
  const n = matrix[0].length;
  // 太平洋- flow1 ， 大西洋- flow2
  const flow1 = Array.from({ length: m }, () => new Array(n).fill(false));
  const flow2 = Array.from({ length: m }, () => new Array(n).fill(false));

  // row-行 colum-列
  const dfs = (r, c, flow) => {
    // flow代表这个地方可以流到某个大洋
    flow[r][c] = true;
    // 上下左右 nr下一行 nc下一列
    [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].forEach(([nr, nc]) => {
      if (
        // 保证在矩阵中
        nr >= 0 && nr < m &&
        nc >= 0 && nc < n &&
        // 防止死循环(图每个节点值遍历一遍)
        !flow[nr][nc] &&
        // 逆流而上
        matrix[nr][nc] >= matrix[r][c]
      ) {
        dfs(nr, nc, flow);
      }
    });
  };

  // 沿着海岸线逆流而上
  for (let r = 0; r <= m - 1; r++) {
    // 第一列
    dfs(r, 0, flow1);
    // 最后一列
    dfs(r, n - 1, flow2);
  }
  for (let c = 0; c < n; c++) {
    // 第一行
    dfs(0, c, flow1);
    // 最后一行
    dfs(m - 1, c, flow2);
  }

  // 收集能流到两个大洋里面的坐标
  const res = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      // 可以同时流入两个大洋的
      if (flow1[r][c] && flow2[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
};