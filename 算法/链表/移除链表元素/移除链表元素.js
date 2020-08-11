/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    if (head == null) return null

    // 新链表的头结点
    let newHead = null;
    // 新链表的尾结点
    let newTail = null;

    while (head != null) {
        if (head.val != val) {

            if (newTail == null) {
                // 新链表只有一个元素
                newHead = head;
                newTail = head;
            } else {
                // 将head拼接到newTail的后面
                newTail.next = head;
                newTail = head;
            }
        }
        head = head.next;
    }
    if (newTail == null) {
        return null
    } else {
        // 尾结点的next要清空
        newTail.next = null;
    }
    return newHead;
};