## 141. 环形链表
[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

## 描述


给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

 

示例 1：

输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
![20200701202252](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200701202252.png)

示例 2：

输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。

![20200701202256](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200701202256.png)
示例 3：

输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
![20200701202302](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200701202302.png)
## 思路

- 快慢指针
- slow,fast，两个指针做跑圈，相遇则有环


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
 * 核心思想：类似跑圈，快指针会追上慢指针，两个相遇
 * - 快慢指针
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (head == null || head.next == null) return false;
    // 快指针和慢指针跑圈，相遇则是环
    let slow = head;
    let fast = head.next;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }

    return false
};
```


## 测试用例

### time
### space