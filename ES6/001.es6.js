// es6 提供了新的声明方式替代了以前的var
// let const

// var 不支持封闭作用域,会声明到全局作用域上
// 1.函数作用域 2.全局作用域
(function() {
    for (var i = 0; i < 3; i++) {
        console.log(i);
    }
})();
console.log(i)
console.log(window.i)
    // ----------------------------------------
for (var i = 0; i < 3; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i)
        }, 1000)
    })(i);
}
// ----------------------------------------

// let和{}配合可以生成一个作用域
// let支持块级作用域，声明的变量只会声明在当前作用域内
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i)
    }, 1000)
}
console.log(i);

// 优点
// 一. let可以解决污染问题和局部作用域的问题
// 二. 在用一个作用域下可以多次声明同一个变量

var a = 1;

function b() {
    let a = 1;
    let a = 2;
}
b();
// Identifier 'a' has already been declared
// let可以阻止变量被重复声明，如果用let声明过的变量，不要在用var再声明

// 三. 域解释问题，变量提升 用let解决这个问题
// 暂存死区,如果作用域内，有了外面的变量地之一，那么这个作用域内就会绑定这个变量，不会继续向上查找了。
let a = 1; {
    console.log(a);
    let a = 2;
}

// 四. 通过const声明的变量不能被修改，不能被修改引用空间

const a = { name: 'hello' };
a.age = 9;
console.log(a);