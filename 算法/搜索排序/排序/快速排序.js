/**
 * 快速排序思路
 * 1. 分区： 从数组中任意选择一个“基准”，所有比基准小的元素放在基准前面，比基准大的元素放在基准的后面
 * 2. 递归： 递归地对基准前后的子数组进行分区
 * 
 * 
 * 时间复杂度: 
 * 1. 递归的时间复杂度是O(log(N))
 * 2. 分区操作的时间复杂度是O(n)
 * 3. 时间复杂度: O(n * log(N) )
 */

Array.prototype.quickSort = function () {
  const rec = (arr) => {
    if (arr.length === 1) { return arr; } // 递归出口
    const left = []; // 左侧数组
    const right = []; // 右侧数组
    const mid = arr[0]; // 基准
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]); // 小于基准的放在左边
      } else {
        right.push(arr[i]); // 大于基准的放在右边
      }
    }
    return [...rec(left), mid, ...rec(right)]; // 返回递归后的左 + 基准 + 右 的拼接数组
  };
  const res = rec(this);
  res.forEach((n, i) => { this[i] = n }); // 将res的值 赋值给arr
};

const arr = [2, 4, 5, 3, 1];
arr.quickSort();
