## 分隔链表
[86. 分隔链表](https://leetcode-cn.com/problems/partition-list/)

## 描述

给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

示例:

输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/partition-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 思路

- 定义两个虚拟头结点，小于x的放在lHead后面，大于x的放在rHead后面，最后拼接两个链表
- 注意：当rTail已经是最后一个，但是lTail还在继续，那么最后这个rTail指向是后面的lTail链表，
在while循环结束，记得将rTail.next = null

## 代码

```js
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
```


## 测试用例
![20200628225950](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200628225950.png)
### time
时间复杂度: 0(n)
### space
空间复杂度: O(1)