/**
 * 冒泡排序的思路
 * 1. 比较所有相邻元素，如果第一个比第二个大，则交换他们。
 * 2. 一轮下来，可以保证最后一个数是最大的。
 * 3. 执行n-1轮，就可以完成排序。
 * 
 * 
 * 时间复杂度： 两个嵌套循环 time = O(n*2)
 */

Array.prototype.bubbleSort = function () {
  // 循环n-1轮
  for (let i = 0; i < this.length - 1; i++) {
    // 遍历数组
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        // 前者大于后者 交换
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
      }
    }
  }
};

const arr = [5, 4, 3, 2, 1];
arr.bubbleSort();