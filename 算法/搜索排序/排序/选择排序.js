/**
 * 选择排序的思路
 * 1. 找到数组中的最小值，选中它并将其放置在第一位。
 * 2. 接着找出第二小的值，选中它并将其放置在第二位。
 * 3. 以此类推，执行n-1轮
 * 
 * 时间复杂度： 嵌套循环 -> O(n*2)
 */

Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let indexMin = i;
    for (let j = i; j < this.length; j++) {
      // 找到最小值的下标
      if (this[j] < this[indexMin]) {
        indexMin = j;
      }
    }
    if (indexMin !== i) {
      // 将最小值与第一位交换
      [this[i], this[indexMin]] = [this[indexMin], this[i]];
    }
  }
};

const arr = [5, 4, 3, 2, 1];
arr.selectionSort();

