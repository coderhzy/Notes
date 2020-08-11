/**
 * @param {number[]} array
 * @return {number[]}
 */
var subSort = function(array) {
    if (array.length === 0) return [-1, -1]
        // 从左扫描到右，来寻找逆序对(正序逐渐变大)。从右到左则反之。
        // max存储最大值
    let max = array[0];
    // 用来记录最右的那个逆序对位置
    let r = -1;
    // i用来扫描整个数组
    for (let i = 1; i < array.length; i++) {
        // 取出一个数
        let v = array[i];
        // 找到一个大于最大值的数，替换当前最大值。 否则说明是逆序对，标记那个值的位置。 
        // 为了逆序对足够小，等于的时候不标记。
        if (v >= max) {
            max = v
        } else {
            r = i
        }
    }

    if (r == -1) return [-1, -1]

    // 从右扫描到左，来寻找逆序对(正序逐渐变小)
    // min存储最小值
    let min = array[array.length - 1];
    // 用来记录最右的那个逆序对位置
    let l = -1;
    // i用来扫描整个数组
    for (let i = array.length - 2; i >= 0; i--) {
        // 取出一个数
        let v = array[i];
        // 找到一个大于最大值的数，替换当前最大值。 否则说明是逆序对，标记那个值的位置。 
        // 为了逆序对足够小，等于的时候不标记。
        if (v <= min) {
            min = v
        } else {
            l = i
        }
    }
    return [l, r];
}