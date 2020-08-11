## 417. 太平洋大西洋水流问题
[417. 太平洋大西洋水流问题](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/)

## 描述

给定一个 m x n 的非负整数矩阵来表示一片大陆上各个单元格的高度。“太平洋”处于大陆的左边界和上边界，而“大西洋”处于大陆的右边界和下边界。

规定水流只能按照上、下、左、右四个方向流动，且只能从高到低或者在同等高度上流动。

请找出那些水流既可以流动到“太平洋”，又能流动到“大西洋”的陆地单元的坐标。

 

提示：

输出坐标的顺序不重要
m 和 n 都小于150
 

示例：

 

``` JS
给定下面的 5x5 矩阵:

  太平洋 ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * 大西洋
```


返回:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (上图中带括号的单元).

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/pacific-atlantic-water-flow
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 思路

- 把矩阵抽象成图
- 从海岸线逆流而上，所到之处就是可以流到某个大洋的坐标。

- 新建两个矩阵，分别记录能流到两个大洋的坐标
- 从海岸线，多管齐下，同时深度优先遍历，过程中填充上述矩阵
- 遍历两个矩阵，找出能流到两个大洋的坐标

常见flow1和flow2矩阵并填充false
![20200811114858](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200811114858.png)
## 代码

``` JS
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
```


## 测试用例
![20200811122042](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200811122042.png)
### time
时间复杂度: O(m*n)
### space
空间复杂度: O(m*n)