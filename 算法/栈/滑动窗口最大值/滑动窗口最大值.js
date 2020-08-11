/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * @ import  from '../../helper/heper.js'
 */
var maxSlidingWindow = function(nums, k) {
    //使用对象模拟双端队列
    class Deque { //声明双端队列类
        constructor() {
            this.items = {}; //队列对象
            this.lowestCount = 0; //头部项的下标值
            this.count = 0; //队列长度计数器(注意:this.count位置上永远是无值的。队列不为空，它的前一位就为队列尾部项);
        }
        isEmpty() { //判断双端队列是否为空，返回布尔值
            return (this.count - this.lowestCount) === 0;
        }
        clear() { //清空双端队列，无返回值
            this.items = {};
            this.lowestCount = 0;
            this.count = 0;
        }
        size() { //返回双端队列的大小
            return this.count - this.lowestCount;
        }
        addFront(element) { //在双端队列前添加一个项
            if (this.lowestCount === this.count) { //队列为空的情况
                this.items[this.count] = element;
                this.count++;
                return;
            }
            if (this.lowestCount === 0) {
                for (let i = this.count; i > 0; i--) {
                    this.items[i] = this.items[i - 1];
                }
                this.items[0] = element;
                this.count++;
            } else {
                this.items[this.lowestCount - 1] = element;
                this.lowestCount--;
            }
        }
        addBack(element) { //在双端队列后面添加一项
            this.items[this.count] = element;
            this.count++;
        }
        removeFront() { //删除双端队列头部项
            if (this.lowestCount === this.count) {
                return undefined;
            }
            let w = this.items[this.lowestCount];
            delete this.items[this.lowestCount];
            this.lowestCount++;
            return w;
        }
        removeBack() { //删除双端队列尾部项
            if (this.lowestCount === this.count) {
                return undefined;
            }
            let w = this.items[this.count - 1];
            delete this.items[this.count - 1];
            this.count--;
            return w;
        }
        peekFront() { //查看双端队列头部项
            return this.items[this.lowestCount];
        }
        peekBack() { //查看双端队列尾部项
            return this.items[this.count - 1];
        }
        toString() { //将队列项转成字符串
            if (this.lowestCount === this.count) {
                return '';
            }
            let str = this.items[this.lowestCount];
            for (let i = this.lowestCount + 1; i < this.count; i++) {
                str = `${str},${this.items[i]}`;
            }
            return str;
        }
    }

    if (nums == null || nums.length == 0 | k < 1) return null;
    if (k == 1) return nums;
    // 滑动窗口
    let maxes = [nums.length - k + 1];
    // 双端队列
    let deque = new Deque()
    for (let i = 0; i < nums.length; i++) {
        while (!deque.isEmpty() && nums[i] >= nums[deque.peekBack()]) {
            // 删除双端队列尾部项。
            deque.removeBack();
        }

        // 将i加到队列尾部
        deque.addBack(i);

        // 检查滑动窗口的索引是否合法
        let w = i - k + 1;
        // 判断
        if (w < 0) continue;
        // 检查队头对合理性
        if (deque.peekFront() < w) {
            //  非法
            deque.removeFront();
        }
        //设置窗口对最大值
        maxes[w] = nums[deque.peekFront()];
    }
    return maxes;
};