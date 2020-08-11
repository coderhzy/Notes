/**
 * 
 * 核心思想：
 * 解法一：基栈 + 辅助栈
 * 时间复杂度：O(1)
 * 空间复杂度：O(n)
 * 思路
 * 额外维护一个最小值栈，初始化为第一个元素，用来保存历史最小值集合
 * 入栈
 * 当有更小值入栈时，将当前值入最小栈中
 * 出栈
 * 当出栈值 == 当前最小值时，最小栈的值也要删掉，最小值自然更新为前一步的最小值
 * 取最小值
 * 返回与当前基栈同步的最小栈的栈顶元素即为最小值
 * 
 * 
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.min_stack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    // 初始化 或 当有更小值入栈时，将当前值入最小栈中
    if (this.min_stack.length == 0 || this.min_stack[this.min_stack.length - 1] >= x) {
        this.min_stack.push(x)
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    // 当出栈值 == 当前最小值时，最小栈的值也要删除掉，最小值自然更新为前一步当最小值
    if (this.stack.pop() == this.min_stack[this.min_stack.length - 1]) {
        this.min_stack.pop();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    //  返回与当前基栈同步的最小栈顶元素就是最小值
    return this.min_stack[this.min_stack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 */