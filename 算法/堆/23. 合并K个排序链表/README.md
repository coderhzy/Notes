## 23. 合并K个排序链表
[23. 合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

## 描述

合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

``` JS
示例:

输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 新链表的下一个节点一定是k个链表头中的最小节点。 
- 考虑选择使用最小堆

解题步骤:
1. 构建一个最小堆，并依次把链表头插入堆中。
2. 弹出堆顶接到输出链表，并将堆顶所在链表的新链表头插入堆中。
3. 等堆元素全部弹出，合并工作就完成了。

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
    if (this.heap[parentIndex] && this.heap[parentIndex].val > this.heap[index].val) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  // 下移
  shiftDown (index) {
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    if (this.heap[leftIndex] && this.heap[leftIndex].val < this.heap[index].val) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] && this.heap[rightIndex].val < this.heap[index].val) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  // 下移第一步
  pop () {
    if (this.size() === 1) return this.heap.shift();
    // 记录堆顶
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    return top;
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
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 构建空链表链表头
  const res = new ListNode(0);
  let p = res;
  const h = new MinHeap();
  // 将链表头部节点放到堆中
  lists.forEach(l => {
    h.insert(l);
  });
  while (h.size()) {
    const n = h.pop();
    p.next = n;
    p = p.next;
    if (n.next) h.insert(n.next);
  }
  return res.next;
};
```



## 测试用例
![20200813100045](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200813100045.png)
### time
时间复杂度: O(n * log(k))
### space
空间复杂度: O(k)  堆的大小