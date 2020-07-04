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