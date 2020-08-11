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


// 双指针遍历

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 核心思想：
 * 反转两个节点: 将n+1的next指向n
 * 反转多个节点：双指针遍历链表，重复上述操作
 * 
 * 解题步骤：
 * 1. 双指针一前一后遍历链表
 * 2. 反转双指针
 * 
 * Time: O(n)
 * Space: O(1)
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let p1 = head;
    let p2 = null;
    while(p1){
        const temp = p1.next;
        p1.next = p2;
        // 双指针遍历
        p2 = p1;
        p1 = temp;
    }
    // p1最后是空，所以返回p2
    return p2;
};