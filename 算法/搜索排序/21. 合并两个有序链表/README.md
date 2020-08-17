## 21. 合并两个有序链表
[21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

## 描述

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

 

示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-two-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

合并两个有序链表-解题步骤
- 新建一个新链表，作为返回结果
- 用指针遍历两个有序链表，并比较两个链表的当前节点，较小者接入新链表，并将指针后移一步
- 链表遍历结束，返回新链表


## 代码

``` JS



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const res = new ListNode(0);
  let p = res; // p始终指向新链表的表尾
  let p1 = l1;
  let p2 = l2;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }
  // 链表不一样长
  if (p1) {
    p.next = p1; // 直接接到后面
  }
  if (p2) {
    p.next = p2;
  }
  return res.next; // res节点无意义，所以返回res.next
};
```


## 测试用例
![20200816220753](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200816220753.png)
### time
时间复杂度： 
1. 有个while循环体 time：O(n)

### space
空间复杂度：
1. 新建变量都是指针。 space:O(1)
