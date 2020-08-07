// 箭头函数 es6 写起来简单，可以解决this的问题
// 函数 高阶函数
// 箭头函数特点: 1.箭头函数没有function的关键字
//             2.小括号和打括号之前有个箭头
//             3.如果参数是一个，可以省略小括号
//             4.如果没有return，可以不写大括号
//             5.如果直接返回的是对象类型，需要用小括号来包裹

// 普通函数
function fn() {
    return a;
}

let fn = (a) => {
    return a;
}

function a(c) {
    return function(d) {
        return { sum: c + d };
    }
}

let a = c => d => ({ sum: c + d });
console.log(a(1)(2));



// 可以解决this的问题，看this指代的是谁，看前面的是谁就是谁
// 1. 解决this的问题，var that = this
let obj = {
    a: function() {
        let that = this;
        setTimeout(function() {
            console.log(that);
        }, 1000)
    }
}
obj.a();

// 2.通过bind方式绑定this，call，apply
let obj = {
    a: function() {
        setTimeout(function() {
            console.log(this);
        }.bind(this), 1000)
    }
}
obj.a();

// 3.箭头函数，箭头函数中没有this指向
// 对象不是作用域
let obj = {
    a: function() {
        setTimeout(() => {
            console.log(this);
        }, 1000)
    }
}
obj.a();
// { a: [Function: a] }

// let声明也不会声明到window上
let a = 1;
let obj = {
    a: 2,
    b: () => {
        console.log(this.a);
    }
}
obj.b();
//undefined


// 箭头函数中么有arguments
// ...叫做剩余运算符，就是把多余的都放到数组中(放到最后一个)
let fn = (x, ...args) => {
    console.log(args)
}
fn('x', 1, 2, 3, 4, 5)

//函数可以赋予默认参数

let fn = (a = 2, b = 2) => {
    console.log(a, b);
}
fn();