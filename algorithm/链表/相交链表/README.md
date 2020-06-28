## 链表的中间结点
[160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

## 描述

编写一个程序，找到两个单链表相交的起始节点。
![20200628195749](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200628195749.png)
## 思路

典型的快慢指针
- 拼接两个链表
- 定义两个从head开始的指针，curA和curB来扫描数组。两个头指针为headA和headB
- 当curA值 等于 curB值说明找到相交，就找到了


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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA == null || headB == null) return null;
    let curA = headA,
        curB = headB;
    while (curA != curB) {
        // 核心思想： 拼接两个字符串
        curA = (curA == null) ? headB : curA.next;
        curB = (curB == null) ? headA : curB.next;

        // 注释代码会死循环
        // curA = (curA.next == null) ? headB : curA.next;
        // curB = (curB.next == null) ? headA : curB.next;
    }
    return curA;
};
```


## 测试用例
![20200628210500](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200628210500.png)

### time
时间复杂度：O(n)
### space
空间复杂度: O(1)