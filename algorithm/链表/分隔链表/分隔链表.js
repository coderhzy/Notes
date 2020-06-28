/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    if (head == null) return null;
    // 定义两个虚拟头节点，两个尾指针。最后拼接两个链表
    let lHead = new ListNode(0),
        rHead = new ListNode(0);
    let lTail = lHead,
        rTail = rHead;
    while (head != null) {
        if (head.val < x) {
            // 放在lTail后面
            lTail.next = head;
            lTail = head;
        } else {
            // 放在rTail后面
            rTail.next = head;
            rTail = head;
        }
        // 移动head指针
        head = head.next;
    }
    // 原因： 可能rTail最后一个结点后面可能跟着都是lTail.next
    rTail.next = null;
    //  将rHead.next拼接在lTail后面
    lTail.next = rHead.next;
    return lHead.next;
};