/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    if (l1 == null) return l2;
    if (l2 == null) return l1;
    // 虚拟头节点
    let dummyHead = new ListNode(0);
    let last = dummyHead;
    // 进位值
    let carry = sum = 0;
    while (l1 || l2) {
        let v1 = v2 = 0;
        if (l1 != null) {
            v1 = l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            v2 = l2.val;
            l2 = l2.next;
        }
        sum = v1 + v2 + carry;
        // 设置进位值
        carry = Math.floor(sum / 10);
        // sum的个数位作为新结点的值
        last.next = new ListNode(sum % 10);
        // last后移
        last = last.next;
    }
    // 检查最后进位
    if (carry > 0) {
        last.next = new ListNode(carry);
    }
    return dummyHead.next;
};
