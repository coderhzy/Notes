/**
 * 归并排序的思路
 * 1. 分：把数组劈成两半，再递归地对子数组金星“分”操作，知道分成一个个单独的数。
 * 2. 合：把两个数合并为有序数组，再对有序数组进行合并，直到全部数组合并为一个完整的数组。
 *
 * 合并两个要有序数组:
 * 1. 新建一个空数组res，用于存放最终排序后的数组。
 * 2. 比较两个有序数组的头部，较小者出队并推入res中。
 * 3. 如果两个数组还有值，就重复第二步。
 * 
 * 时间复杂度: time = O(log(N) * n)
 */

Array.prototype.mergeSort = function () {
  // 递归
  const rec = (arr) => {
    // 递归出口，返回划分好的数组
    if (arr.length === 1) { return arr; }
    const mid = Math.floor(arr.length / 2); // 数组中间节点
    const left = arr.slice(0, mid); // 左侧数组
    const right = arr.slice(mid, arr.length); // 右侧数组
    const orderLeft = rec(left); // 排序好的左侧数组
    const orderRight = rec(right); // 排序好的右侧数组
    const res = []; // 返回数组
    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift()); // 出队
      } else if (orderLeft.length) {
        res.push(orderLeft.shift()); // 右侧空，出队左
      } else if (orderRight.length) {
        res.push(orderRight.shift()); // 左侧空，出队右
      }

    }
    return res; // 返回合并后的有序数组
  };
  const res = rec(this);
  res.forEach((n, i) => { this[i] = n; }); // 将res数组拷贝到原来数组arr上
}

const arr = [5, 4, 3, 2, 1];
arr.mergeSort();
