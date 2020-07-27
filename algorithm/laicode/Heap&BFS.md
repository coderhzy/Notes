# Heap&BFS

堆(heap)被称为: 优先队列(priority queue)

Example: 

                1
              /   \
             3     2
            /  \  /  \
           5    4 7   null

| index | 0 | 1 | 2 | 3 | 4 | 5 |
| ----- | - | - | - | - | - | - |
|       | 1 | 3 | 2 | 5 | 4 | 7 |

**Heap:is an unsorted array but have special rules to follow**

性质: 堆实现通过构造二叉堆( binary heap ) ，这种数据结构具有以下性质：

1. 任意节点都小于它下一层节点，最小元素在堆堆根上（堆序性）。
2. 堆总是一棵完全树。complete tree
3. 将根节点最大堆叫做MAX HEAP，根节点最小堆堆叫做最小堆MIN HEAP
4. index of lchild = index of parent * 2 + 1;
5. index of rchild = index of parent * 2 + 2;
6. unsorted but follow rule above.

支持的基本操作

1. insert: inset a new element into the heap. **Time**: O(log(n)).
2. update: elevate the new element to conform to the nature of he heap. **Time**: O(log(n)).
3. get/top: get the value of the current heap top element. **Time**: O(1) 
4. pop: remove heap top element. **Time**: O(log(n))
5. heapify:  make a unsorted array to a heap. **Time**: O(n)

经典例题：
**Question1**: Find smallest k elements from an unsorted array of size on.

How to make assumptions?

1. what is the relationship between k and n ???

Solution1: sort it and return the first k element!  **Time**: O(nlog(n))

Solution2: 

* Step1: How to build a min-heap? ---> heapify it. O(n)
* Step2: Keep popping out k elements ---> O(klogn)

**Total time**: O(n + klog(n))

Solution3:

* Step1: use a max-heap of size k    **Time**: O(k)

采用幼儿园高矮个排队
xxxxxxx  X  xxxxxxxxxxxxxxxxxxxx
max-heap(7)

*  Step2: iterate from the (k+1)-th to the n-th element, and for the current element X.

  &nbsp; &nbsp; **case1:** if X max-heap.top() , max-heap.pop(), and max-heap.insert(X); &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; **Time**: log(k)
  &nbsp; &nbsp; **case2** else , do nothings
**Total**: O(k) + O((n-k)logk)

``` 
// Compare Soultion2 vs Solution3 
Solution2: O(n + klog(n))        Solution3: O(k) + O((n-k)logk)
Case1: k <<<<<<< n  e.g k = 20, n = 1 billion

      O(c * n)                            n * log(k)

Conclusion: it depends

Case1: k ~ n      e.g k ~ billion  n = 1 billion
Conclusion: it depends

    O(nlog(n))                       O(nlog(n))    k ~ 0.5

```

**Solution4**:

``` 
   smaller          larger
  xxxxx      p1   xxxxxxxxxxxxx   n = 10000, k = 300
  xxx        p2   xxxxxxxxxxxxxx  n = 5000 , k = 300
  x          p3   xxxxxxxxxxxxxxx   n = 2500, k = 300
             p4   xxxxxxxxxxxxxxxx  n = 2499, k = 300
```

Quick partition:
Worst case: O(n^2)
Acerage case: O(n)     n + n/2 + n/4 + n/8

## Graph:

![20200726075741](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200726075741.png)

* first methods
1. node
2. edge
3. Directed vs undirected graph
4. Representation of the graph

![20200726074810](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200726074810.png)

**props**: Respresention is easy to implement. Edge removal takes O(1) time. Queries like whether there is an edge from vertex'u' to vertex 'v' are effcient and can be done O(1).
**Cons**: Consumes more space O(V*2). (V is the number of vertex/node). Even if the graph is spare(contain less number of edges) = waste of space.

* second methods - Adjacency List

 0 -> 1 -> 4
 1 -> 0 -> 4 -> 3 -> 2
 2 -> 1 -> 3
 3 -> 1 -> 4 -> 2
 4 -> 3 -> 0 -> 1

 vertices/nodes: V
 Edges: E

**props**: space complexity = O(V + E). Adding a vertex/node to the graph is easier.
**Cons**: Time complexity is O(V) to check whether there is an edge from a node to the other.(conpared to O(1) in adjacent matrix).

* third methods - use a hash table

key = node , value  = vector of successors

**常用的graph search算法**:

1. breadth-first(BFS-1)

``` 
          1
        /   \
      3       2
     /  \    / 
    5    4  7
   /  \
  9    11
```

use queue, and queue isEmpty then stop.

``` js
function BFS1(Node root) {
    if (root == null) {
        return;
    }
    Queue < Node > q = new LinkedList < Node > ();
    q.offer(root);
    while (!q.empty()) {
        let size = q.size(); //size = # of generated nodes in the next year.
        for (let i = 0; i < size; i++) {
            Node n = q.remove();
            if (n.left != null) {
                q.offer(n.left);
            }
            if (n.right != null) {
                q.offer(n.right);
            }
            console.log(n.val + "")
        }
        console.log()
    }
}
```

**Question2**: bipartitle: whether a grapth's node can be divied into two group, such that the nodes in each group do not hava direct edges between the nodes that belong to the same group.

倒三角解决，第一次出现矛盾就false.

**Question3**: Determine whether a binary tree is a complete binary tree.

``` 
          1
        /   \
      3       2
     / \     / \
    5   4   7   null
```

Solution: after detecting the first node that misses one child, then check whether all following nodes expanded to see whether they have any node generated(if any -> then false) 

**Discussion**:

1. When should we consider to use BFS1 to solve a class of quertions?

when we deal with the tree-related problem and in the meantime we need to address the relationship on the same level.

2. BFS1 is not the right algoritm to find the shortset path in an arbitray graph.

**Best First Search(BFS-2)**:
经典算法：Dijkstra‘s Algorithm

1. Usages: Find the shortest path const from a single node(source node ) to any other nodes in that graph.( 点 -> 面 == 所有点的最短距离算法)
2. Example problem：从北京到中国其他主要城市的最短距离是多少？
3. Data structure： priority_queue( MIN _HEAP)
4. 解题思路：
* intial state(start node)
* Node expansion/Generation rule
* Termination condition: 所有点都计算完毕才停止，也就是p_queue变空

properties:

* one node can be expanded once and only once
* one node can be generated more than once.(cost can be reduced over time ).
* all the cost of the nodes that are expanded are monotonically non-decreasing(所有从priority queue里面pop出来的元素的值是单调非递减---> 单调递增)
* time complexify for a graph with n node and the connectivity of the node is O(nlogn)
* when a node is popped out for expansion, its value is fixed which is equal to the shortest distance from the start node

**经典考题:**(运用 Dijkstra's Algorithm性质)
Given a matrix of size NxN, and for each row the elements are sorted in an ascending order, and for each column the elements are also sored in an ascending order.
How to find the k-th smallest element in it?

e.g
1 2 3 4 5
2 3 4 5 6
3 4 5 6 7
4 5 6 7 8
5 6 7 8 9

BFS2 Solution:

1. inital state (start node)

 input[0][0]

2. Node expansion/Generation rule:

  Expand[0][0]
  generate[0][1]
  genreate[1][0]

3. Termination condition: 所有点都计算完毕才停止

  When the k-th element is popped out of the p-queue

4. de-duplication for 3b node

 t t t x x
 t t x x x 
 x x x x x 
 x x x x x 

  checkNode if true do not generate

  **Time and Space**
  There are k iterations, we need to pop an element out of the p-queue for expansion, heap.pop()   log(k)
  Generate at most two neighbors.     heap.insert(neighbor)   2log(k)
  Time: O(3klog(k)) = O(klog(k))

  space: O(k)
