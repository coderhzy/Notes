/**
 * 21. 合并两个有序链表-解题步骤
 * 1. 新建一个新链表，作为返回结果
 * 2. 用指针遍历两个有序链表，并比较两个链表的当前节点，较小者接入新链表，并将指针后移一步
 * 3. 链表遍历结束，返回新链表
 * 
 * 时间复杂度： 
 * 1. 有个while循环体 time：O(n)
 * 空间复杂度：
 * 1. 新建变量都是指针。 space:O(1)
 */


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