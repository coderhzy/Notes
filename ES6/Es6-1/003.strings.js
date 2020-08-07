// es6 模版字符串 特殊的字符串
// 模版字符串取代了原有的字符串拼接功能
let name = 'hello';
let age = 10;
let str = `helle${age}`;
console.log(str)

// 如何自己实现一个类模版字符串

let name = 'hello'
let age = 9;
let str = 'hello~${name}今年${age}岁了'
str = str.replace(/\$\{([^}]*)\}/g, function() {
    return eval(arguments[1]); // with
})
console.log(str);

// 带标签带模版字符 自定义模版字符串的实现
let name = 'hello'
let age = 9;

function hzy() { // 第一个参数是字符串的数组 第二个参数是第一个变量
    let strings = arguments[0];
    let values = [].slice.call(arguments, 1);
    let str = '';
    for (let i = 0; i < values.length; i++) {
        str += `${strings[i]}*${values[i]}*`
    };
    str += strings[strings.length - 1];
    return str;
}
let str = hzy `hello~${name}今年${age}岁了`
console.log(str)


// includes 是否包含
let url = 'http://www.baidu.com';
console.log(url.includes('baidu'));
// startsWith 已xxxx开头
let url = 'http://www.baidu.com';
console.log(url.startsWith('http://'));
// endsWith 已xxx结尾
let url = 'http://www.baidu.com';
console.log(url.endsWith('com'));
// padStart padEnd 补全
setInterval(function() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let str = `${hour.toString().padStart(2,0)}:`;
    str += `${minutes.toString().padStart(2,0)}:`;
    str += `${seconds.toString().padStart(2,0)}`;
    console.log(str)
}, 1000)