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