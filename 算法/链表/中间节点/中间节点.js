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
var middleNode = function(head) {
  if(head == null) return null;
  let slow = head,fast = head;
  // 快慢指针
  while(fast && fast.next){
      slow = slow.next;
      fast = fast.next.next;
  }
  return slow;
};