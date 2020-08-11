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
 * 
 * 
 * 核心思想L： 考虑边界情况
 * - 删除的元素在头部
 * - 删除u的元素在尾部
 * 
 * 定义两个指针，i是目标节点前的一个节点，j是目标节点
 * 
 * 保存j -> next 为tail
 * 将前一个元素，i.next 指向目标元素的next
 */

var deleteNode = function(head, val) {
    if (head === null) return head;
    let i = head,
        j = head.next;
    // 判断是否开头节点是否要删除
    if (head.val === val) {
        return j;
    }
    // 两个指针扫描整个数组
    while (j.val != val) {
        i = i.next;
        j = j.next;
    }
    // 循环结束后，j一定是我们要删除的目标节点
    let tail = j.next;
    i.next = tail;
    return head;
};