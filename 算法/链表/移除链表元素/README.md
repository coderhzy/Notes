## 移除链表元素
[203. 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

## 描述

删除链表中等于给定值 val 的所有节点。

示例:

输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5

## 思路

典型的快慢指针

- 定义三个指针分别是newHead，newTail，head
- head来扫描数组，newHead和newTail是构建新链表
- 我们将不删除的放到新的链表内，最终形成的链表就是我们想要的

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
```


## 测试用例
![20200626223750](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200626223750.png)
### time

时间复杂度：O(n),因为只遍历的一遍
### space
空间复杂度: O(1)