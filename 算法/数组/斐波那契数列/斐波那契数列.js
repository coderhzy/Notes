// 斐波那契数列
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    if (N <= 1) return N;
    let first = 0,
        second = 1;
    for (let i = 0; i < N - 1; i++) {
        second += first;
        first = second - first;
    }
    return second;
};