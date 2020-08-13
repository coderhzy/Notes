## 215. 数组中的第K个最大元素
[215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 描述

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

``` JS
示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:
```


``` JS
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 看到”第k个最大元素“
- 考虑选择使用最小堆


- 构建一个最小堆，并依次把数组中的值插入堆中。


## 代码

``` JS
class MinHeap {
  constructor() {
    this.heap = []
  }

  // 与父节点交换方法
  swap (i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  // 获取左侧子节点
  getRightChildIndex (i) {
    return i * 2 + 2;
  }
  // 获取右侧子节点
  getLeftChildIndex (i) {
    return i * 2 + 1;
  }
  // 获取父节点方法
  getParentIndex (i) {
    return (i - 1) >> 1;
  }

  // 上移
  shiftUp (index) {
    if (index == 0) { return; }
    // 获取父节点
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  // 下移
  shiftDown (index) {
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  // 下移第一步
  pop () {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  // 插入
  insert (value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }

  // 获取堆顶
  peek () {
    return this.heap[0];
  }

  // 获取堆大小
  size () {
    return this.heap.length;
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // 构建最小堆
  const h = new MinHeap();
  // 将数组中的值依次插入到堆中
  nums.forEach(n => {
    h.insert(n);
    if (h.size() > k) {
      h.pop();
    }
  });
  return h.peek();
};
```



## 测试用例
![20200813074805](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200813074805.png)
### time
时间复杂度: 循环*insert和size   -----   O(n * log(k))
### space
空间复杂度: O(k)