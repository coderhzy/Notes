// 剩余运算符&展开运算符
function spread(x, ...args) {
    sum(...args); //展开运算符，展开数组一一映射
}

function sum(a, b, c, d) {
    console.log(a, b, c, d)
}

// 拼接数组