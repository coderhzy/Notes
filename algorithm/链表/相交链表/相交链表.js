/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA == null || headB == null) return null;
    let curA = headA,
        curB = headB;
    while (curA != curB) {
        // 核心思想： 拼接两个字符串
        curA = (curA == null) ? headB : curA.next;
        curB = (curB == null) ? headA : curB.next;

        // 注释代码会死循环
        // curA = (curA.next == null) ? headB : curA.next;
        // curB = (curB.next == null) ? headA : curB.next;
    }
    return curA;
};