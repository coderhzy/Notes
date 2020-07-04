## 239. 滑动窗口最大值
[239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

## 描述

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

 

进阶：

你能在线性时间复杂度内解决此题吗？

 

示例:

输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 

  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
 

提示：

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sliding-window-maximum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 思路

核心：
- 建立一个双端队列，滑动窗口设置w和i索引，i指向滑动窗口最后一个位置，判断i位置当数字是否大于队列尾部元素，大于则删除队列小的，小与则直接加入到队列尾部。
- 这样队列会形成一个从大到小的序列，最终将每次滑动队列中的最左端（最大）加到数组maxes中。


## 代码



```js
    //js中双端队列方法需要自己封装
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
```


## 测试用例
![20200703114112](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200703114112.png)
### time
时间复杂度:O(n) 扫描了一遍
### space
空间复杂度：O(n) 开辟了新数组存储