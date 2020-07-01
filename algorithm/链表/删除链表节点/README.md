## 剑指 Offer 18. 删除链表的节点
[剑指 Offer 18. 删除链表的节点](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

## 描述

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

注意：此题对比原题有改动

示例 1:

输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
示例 2:

输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
 

说明：

题目保证链表中节点的值互不相同
若使用 C 或 C++ 语言，你不需要 free 或 delete 被删除的节点

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- 定义两个指针i，j。i=head，j=head.next。i为头节点，j目标节点
- 通过i，j来扫描数组，找到对应j值。将i->next = j->next，完成j的删除。

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
```

## 测试用例
![20200701102526](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200701102526.png)
### time
时间复杂度: O(n)
### space
空间复杂度: O(1)