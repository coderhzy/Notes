// 解构赋值，声明和赋值都放到一起
// 解构表示等号左边和右边解构类似
// 数组必须位置相同
let [, age] = ['hello', 10];

// 对象解构时，名字必须相同
let { length } = ['hello', 12];
console.log(length)

// 如果有关键字可以采用:的形式进行更改名字
let { name, age, default: d } = { name: 'hello', age: 10, default: 'sayhello' };
console.log(d);

// 如果想设置某个属性的默认值 必须采用=号的方式
let [, { address: [, b] }, hobby = "computer"] = [
    { name: 'hello' },
    { age: 10, address: [12, 23, 45] }
]
console.log(b, hobby);



// 解构的应用
function test() {
    return [1, 2, 3];
}
let [a, b, c] = test();



function ajax({ url = new Error('url without'), type = "get", data = hello }) {
    console.log(url, type, data);
}

ajax({
    url: '/test',
    type: 'get',
    data: {}
})