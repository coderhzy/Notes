## 反转链表
[剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

## 描述


请判断一个链表是否为回文链表。

示例 1:

输入: 1->2
输出: false
示例 2:

输入: 1->2->2->1
输出: true
## 思路

- 定义一个newhead指向链表第二个节点
- 原位置的第二个节点指向第一个
- 反转以后的最后一个节点（原本的第一个节点）指向空

## 代码

```js
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
```

## 测试用例

![20200630224500](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200630224500.png)

### time
时间复杂度: O(n)
### space
空间复杂度: O(1)