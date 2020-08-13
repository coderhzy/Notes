## 347. 前 K 个高频元素
[347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

## 描述

给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

 

``` JS
示例 1:

输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
示例 2:

输入: nums = [1], k = 1
输出: [1]

来源：力扣（LeetCode）
```
提示：

你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
你可以按任意顺序返回答案。
通过次数72,515提交次数119,605

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/top-k-frequent-elements
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


## 思路

1. 统计下每个元素出现的频率
2. 降序排序，统计前k高的元素


## 代码

``` JS
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 *  // 不优
 * 1. 统计下每个元素出现的频率
 * 2. 降序排序，统计前k高的元素
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  nums.forEach(n => {
    // 建立映射关系
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  // 将数组排序
  const list = Array.from(map).sort((a, b) => b[1] - a[1]);
  return list.slice(0, k).map(n => n[0]);
};
```

``` JS


// 创建一个最小堆，将元素插入堆中，按照频率来排序。堆大小维持在k。
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
    if (this.heap[parentIndex] && this.heap[parentIndex].value > this.heap[index].value) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  // 下移
  shiftDown (index) {
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    if (this.heap[leftIndex] && this.heap[leftIndex].value < this.heap[index].value) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] && this.heap[rightIndex].value < this.heap[index].value) {
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
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  nums.forEach(n => {
    // 建立映射关系
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  const h = new MinHeap();
  map.forEach((value, key) => {
    h.insert({ value, key });
    if (h.size() > k) {
      // 踢出堆顶
      h.pop();
    }
  });
  return h.heap.map(a => a.key);
};
```




## 测试用例
![20200813082005](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200813082005.png)
### time
算法一：
时间复杂度: O(n * log(n))
算法二（优）:
时间复杂度: O(n * log(k))
### space

算法二:
空间复杂度: O(n)