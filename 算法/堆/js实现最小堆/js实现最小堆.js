/**
 * 1. 在类中，声明一个数组，用来装元素
 * 2. 主要方法：插入、删除堆顶、获取堆顶、获取堆大小
 */

/**
 * 1. 插入
 *      - 将值插入堆底部，即数组尾部
 *      - 然后上移： 将这个值和它的父节点进行交换，知道父节点小于等于插入的值
 *      - 大小为k的堆中插入元素的时间复杂度为O(logk）  --- 上移的操作最多循环的这个对堆的高度，所以是O(logk)
 * 
 * 
 * 
 * 2. 删除堆顶
 *      - 用数组尾部元素替换堆顶（直接删除堆顶会破坏堆结构）
 *      - 然后下移： 将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶
 *      - 大小为k的堆中删除堆顶的时间复杂度为O(logk)
 * 
 * 3. 获取堆顶和堆大小
 *      获取堆顶： 返回数组的头部
 *      获取堆的大小： 返回数组长度
 */
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

const h = new MinHeap();
h.insert(3);
h.insert(2);
h.insert(1);
h.pop();


