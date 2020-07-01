// 递归方法
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (head == null || head.next == null) return head;
    // 定义一个newhead指向链表第二个节点
    let newHead = reverseList(head.next);
    // 原位置的第二个节点指向第一个
    head.next.next = head;
    // 反转以后的最后一个节点（原本的第一个节点）指向空
    head.next = null;

    return newHead;
};

// 非递归方法
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 
 * 核心思想
 * - 新链表头节点newHead,定义一个temp指向原链表的head.next存储
 * - 将原来head.next -> newHead 此时再newHead -> 原来的head
 * - 这时原来的head ->  temp（我们存储的head.next）
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (head == null || head.next == null) return head;
    let newHead = null;
    while (head != null) {
        // temp 中转存值
        let temp = head.next;
        head.next = newHead;
        newHead = head;
        head = temp;
    }
    return newHead
};