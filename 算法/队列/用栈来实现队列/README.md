## 232. 用栈实现队列
[232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

## 描述

使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。
 

示例:

MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);  
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-queue-using-stacks
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

- stack2.push(stack1.pop())


## 代码
```js
class MyQueue {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }
    push(x) {
        this.stack1.push(x);
    }
    pop() {
        while (this.stack1.length) { // 把stack1的元素全部弹出并推入到stack2
            this.stack2.push(this.stack1.pop());
        }
        const item = this.stack2.pop(); // 弹出stack2的栈顶，即“队列头”，缓存给item
        if (this.stack2.length) { // 如果stack2还有元素，全部弹出并推入stack1
            while (this.stack2.length) {
                this.stack1.push(this.stack2.pop());
            }
        }
        return item;
    }
    peek() {
        while (this.stack1.length) { // 把stack1的元素全部弹出并推入到stack2
            this.stack2.push(this.stack1.pop());
        }
        const item = this.stack2[this.stack2.length - 1]; // 获取stack2的栈顶，即“队列头”，缓存给item
        while (this.stack2.length) { // stack2的元素全部弹出，推入stack1
            this.stack1.push(this.stack2.pop());
        }
        return item;
    }
    empty() {
        return this.stack1.length == 0;
    }
}
```


## 测试用例
![20200704224643](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200704224643.png)
### time
时间复杂度：O(n)
### space
空间复杂度：O(n)，要额外的内存来存储队列中的元素。