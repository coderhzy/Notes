/**
 * 假设有5个数字，我们从中间分开，将左边排好序，右边也排好序。
 * 再分左边和右边，再排序，一直到不可以分为止，这样我们就排好序了。
 * 
 *                   6,5,3,2,9
 *                   /       \
 *                6 5 3     6 1
 *               /    \    /   \
 *            6  5    3   6     1
 *           /    \
 *          6      5
 * 
 * 用6和5来比较，排序后返回上一层。 再和3比较，谁小就移动谁，放在前面，。。。。。。
 * 
 * 时间复杂度： nlog(n)    [整个二叉树有log(n)层，每层返回合并一次，时间是n，所以是n * log(n)]
 * 空间复杂度:  因为拆分和合并，都是DFS，遵循冯诺伊曼体系。 0(n/2 + n/4 + n/8 + ...... + 1) = O(n)
 */

function mergeSort(arr) {
    //判断数组是否为空或为0
    if (arr === null || arr.length === 0) {
        return arr;
    }
    // 将数组复制一份
    let temp = arr.slice();
    arrSort(arr, temp, 0, arr.length - 1);
    return arr;
    /**
     *  将数组从中间分成左边和右边，定义两个指针,分别指向两个数组的开头
     */
    /**
     * 向下递归拆分
     * @param arr
     * @param temp
     * @param start
     * @param end
     */
    function arrSort(arr, temp, start, end) {
        //base case:当数组不可以再分
        if (start >= end) {
            return;
        }
        // 不要用(end+start)/2，防止数值过大
        let mid = start + (end - start) / 2;
        arrSort(arr, temp, start, mid);
        arrSort(arr, temp, mid + 1, end);
        merge(arr, temp, start, mid, end);
    }

    function merge(arr, temp, start, mid, end) {
        // 定义左右指针 + 标识排序数组当前索引index
        let left = start,
            right = mid + 1,
            index = start;
        // 开始移动，左指针不超过mid，右指针不超出end
        while (left <= mid && right <= end) {
            if (temp[left] <= temp[right]) {
                arr[index++] = temp[left++];
            } else {
                arr[index++] = temp[right++];
            }
        }
        // 最后一种情况，数组被从中间分开，mid会分到左边，那么排序后右边一定不会剩余
        while (left <= mid) {
            arr[index++] = temp[left++]
        }
    }
}


let arr = [1, 3, 4, 1, 5]
console.log(mergeSort(arr))