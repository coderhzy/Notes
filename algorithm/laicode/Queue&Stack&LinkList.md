## Queue
**Question1**: How could we implement a queue by using two stacks?

Stack1|| 6 7 8 9
Stack2|| 5 4 3 2 

Solution:
- Stack1: To buffer all new elements   -> push(x)  goes to Stack1
- Stack2: To pop out the 1st element
Case2.1 : if stack2 empty ,remove all element from stack 1 to stack2 one by one. Then pop element from stack2.
Case2.2a : if stack2 is not empty,then we call stack.pop()
- **Amortized** time complexity = (????)
**Amortized**:
Five element (1,2,3,4,5)  = 5(pop from stack1) + 5( push to stack2)  + 1( prop from stack2).
1st time call pop() : n(prop from stack1) + 5(push to stack2) + 1(pop from stack2).
2st time call pop: time = 1.
3st time call pop: time = 1.
.......
nth call pop(): time = 1. 
**AmortizeA** = (2n + 1 + (n -1) / n)  = 3n / n = 3 -> O(1) 

****

**Question2**: How to implement  the min() function when using stack with time complexity o(1);

Stack1 || 1 3 2
Stack2 || 1 1 1

Solution: keep the add() and remove() in sync between stack 1 and stack2 ->> （保持同步加同步减)

**Follow up question**: How to optimize the space usage of stack2 assumptions there are a lot of duplicate element in Stack1?

Stack1 || 2 2 2 2 1 1 1 2 1 1 3 4 3 3 3 3 3 3 1 1 1 1 1 , -1
Stack2 || <2,stack1.size() = 1>,**<1 stack1.size() = 5>,<-1 stack1.size() = 15>**

- Solution: try to make the element in stack2 a descending order. 
And store an element in stack2 in the format of
Element in Stack2 = <value, size of this stack1 when this element is added to stack2>

****

**Question**: How to sort numbers with three(or two) stacks

Input = 3 4

Stack1 || 3 4 
Stack2 || 1 | 2

Method1: while(stack2.size() >= Stack2.initial_size_before_this_iteration)
*Method2: while(stack2.top() >= global_min) { keep popping ... back to s1 }

**Follow if there duplicate element?**

Input = 3 1 1.5 2 2 2 4

Stack1 || 3 4 
Stack2 || 1 2 2 2 

****

**Question4**: How to use multiple stacks to implement a de-queue(deque).
input: 1 2 3 4 5|| Stack1 Stack2|| 6 7 8 9

1 2 3 4 5 ||Stack1 Stack2|| 4 5

Stack3 || 1 2 3 4 5  -> Stack1

```
Amortize time =  O(0.5n + 0.5n + 0.5n  )  / n  = O(2) = O(1)s               
```

**Discussion**
什么问题要往Stack上考虑？
Anwser: 从左到右linear scan 一个array/string时，如果要不断回头看左边最新到元素时，往往要用stack。
1. Histogram中栈最大的长方形。
2. reverse polish notation 逆波兰表达式的计算 a*(b+c) -> abc+*
3. String的repeatedly deduplication. cabba -> caa -> c


## LinkList
Key poins:
1. When you want to de-reference a ListNode,make sure it is not a NULL pointer.
p.value -> de-reference
2. Never ever lost the control of the head pointer of the LinkList.

常见考题：NO.1： interview question on linkedlist: how to reverse a linked list.
**Question-reverse**
- 非递归
```js
var reverseList = function(head) {
    if (head == null || head.next == null) return head;
    let newHead = null;
    while (head != null) {
        // temp 中转存值
        let temp = head.next;
        head.next = newHead;
        newHead = head;
        head = temp;
    }
    return newHead
};
```

- 递归实现:
```js
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


![20200720091016](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200720091016.png)


```js
Example step-by-step:

1st call r-func: NULL <-- node1 <-- node2 <-- node3  NULL
                          head      nextnode  newHead = N3
=============================================================
2st call r-func:          node1 --> node2 <-- node3  NULL  newHead = N3
                                    head      nextnode
=============================================================
3st call r-func:          node1 --> node2 --> node3 -> NULL return as the result
                                              head
=============================================================
```

**Question-Linklist-middle**
Q1.How to find the middle node of a linked list?

N1 -> N2 -> N3 -> N4 -> N5 -> NULL
head1
s1
fa

```js
/**
 * 876. 链表的中间结点
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
```


**Q2.用快慢指针判定一个linkedlist是否有环**
N1 -> N2 -> N3 -> N4 -> N5
```js
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

**Q3.Insert a node in a sorted linkedlist (simple)**
        1 -> 3 -> 6 -> 9 -> NULL
       cur
            cur.next
    corner case: insert 0           what about 100??
    Be careful about two corner cases: head and tail
            error no complete : cur.value < 0 && cur.next.value >=0
                                target 7

**Q4.How to merge two sorted linkedlist into one long sorted linkedlist.**
N1 -> N2 -> N5 -> NULL
cur1

N1.5 -> N3 -> N6 -> NULL

DummyHeadNode(0) -> N1 -> N1.5 -> N2 .....

Solution:
DummyNode
Why or When should we use a dummy node?
when we want to appen new elements to an initially empty linkedlist, we do not have an initial head node. In this case , we can new a dummy node to act as a head node.

return DummyHeadNode.next

**Q5.**
N1 -> N2 -> N3 -> N4 -> N5 -> ......... -> Nn -> null (convert to)
renturn ( N1 -> Nn ) -> ( N2 -> Nn-1) .....


Solution:
Step1: Find the middle node of the Linkedlist (Q1)
Step2: reverse the 2nd half                   (Q2)
        N1 ->  N2        .......   N500
        N1000 -> N999    .......   N501
Step3: Merge two linkedlist into one long linkedlist(Question4)

**Q6.Partition List:**
Given a linkedlist and a target value x , partition it such that all nodes less than x are listed before the nodes larger than or equal to target value x. (keep the original relative order to the nodes in each of the two partitons).

Forexample:
input: 1 -> 6 -> 3 -> 2a -> 5 -> 2b and target x = 4,
result: 1 -> 3 -> 2a -> 2b -> 6 -> 5

*Solution:*
- Step1: allcote two new linkedlist heads;
- Step2: Iterate over every single element in the list, and compare with the current node's value with the target's value.

```js
input = 1 -> 6 -> 3 -> 2a -> 5 -> 2b
        cur

DummyHeadSmall(0) -> 1 -> 3 -> 2a -> 2b
                                    tailSmall
DummyHeadLarge(0) -> 6 -> 5
                        tailLarge
tailSmall.next = DummyHeadLarge.next; // 2b -> 6
1 -> 3 -> 2a -> 2b -> 6 -> 5 -> null

1 -> 3 -> 2a -> 2b -> 6 -> 5   // 死循环
                <---------

```