## 两数相加
[2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

## 描述

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

典型的快慢指针
- 构建虚拟结点
- 新链表的值是由 L1 + L2 + 进位值
- 最后注意判断进位值大于0，放在链表的最后一个结点
- 返回虚拟头结点的下一个结点就是结果链表


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
```

## 测试用例

![20200627222952](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627222952.png)
### time
时间复杂度: O(max(m,n)) 假设m和n分别是l1和l2的长度，上面的算法最多重复O(max(m,n))次
### space
空间复杂度：O(max(m,n))，新链表为 max(m,n)+ 1长