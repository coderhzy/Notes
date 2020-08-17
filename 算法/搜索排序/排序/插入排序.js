/**
 * 插入排序的思路
 * 1. 从第二个数开始往前比
 * 2. 比它大就往后排
 * 3. 以此类推到最后一个数
 * 
 * 时间复杂度: 嵌套循环 -> time: O(n*2)
 */

Array.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    // 数组第二个数
    const temp = this[i];
    let j = i;
    while (j > 0) {
      // 前一个数大于后一个数，则将后面数交换到前面
      if (this[j - 1] > temp) {
        this[j] = this[j - 1];
      } else {
        break;
      }
      j -= 1;
    }
    // 每轮的最小值会保存在temp中，将其换到数组第一位
    this[j] = temp;
  }
}

const arr = [5, 4, 3, 2, 1];
arr.insertionSort();