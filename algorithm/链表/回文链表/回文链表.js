/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 * @function middleNode 找中心节点
 * @function reverseList 翻转右半部分（中间节点的有部分）
 */
var isPalindrome = function(head) {
    // 链表有一个节点
    if (head == null || head.next == null) return true;
    //链表有两个节点
    if (head.next.next == null) return head.val == head.next.val;
    // 两个以上

    // 找到中间节点
    let mid = middleNode(head);
    // 翻转右半部分（中间节点的有部分）
    let rHead = reverseList(mid.next);
    // 左边头节点
    let lHead = head;
    // 存下初始rOldHead值
    let rOldHead = rHead;

    // 判断是否是回文链表
    let result = true;
    while (rHead != null) {
        if (lHead.val != rHead.val) {
            result = false;
            break;
        }
        lHead = lHead.next;
        rHead = rHead.next;
    }

    // 恢复后半部分（对右半部分再次反转）,让数组复原
    reverseList(rOldHead);
    return result;


    function middleNode(head) {
        // 核心思想： 快慢指针，快2慢1,考虑节点数的奇偶
        let fast = head,
            slow = head;
        // 循环条件，考虑节点数的奇偶
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    function reverseList(head) {
        if (head == null || head.next == null) return head;
        // 定义一个newhead指向链表第二个节点
        let newHead = reverseList(head.next);
        // 原位置的第二个节点指向第一个
        head.next.next = head;
        // 反转以后的最后一个节点（原本的第一个节点）指向空
        head.next = null;

        return newHead;
    }
};