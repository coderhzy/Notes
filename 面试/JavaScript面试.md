[toc]
# JavaScript面试
## js基础知识
### 变量类型和计算
- typeof能判断哪些类型
- 何时用用 === 和事用 ==
- 值类型和引用类型的区别
- 手写深拷贝

**什么是值类型**
```js
//值类型
let a = 100;
let b = a;
a = 200;
console.log(b);   // 100
```
**什么是引用类型**
```js
let a = { age: 20 };
let b = ;
b.age = 21；
console.log(a.age);
```
#### 为什么要有引用类型和值类型
因为引用类型类型内容可能会很大，复制慢。
**常见值类型**
```js
let a //undefined
const s = ‘abc’
const n = 100
const b = true
const s = Symbol(‘s’)
```

**常见引用类型**
```js
const obj = { x: 100 }
const arr = [ ‘a’, ‘b’, ‘c]

const n = null; //  特殊引用类型，指针指向为空

// 特殊引用类型，不用于存储数据，所以没有”拷贝、复制函数“
function fn() {}
```

### typeof
1. 识别所有值类型
```js
// 判断所有值类型
let a;                  typeof a  // ‘undefined’
const str = ‘abc’;      typeof str // ‘string’
const n = 100;          typeof n // ‘number’
const b = true;         typeof b // ‘boolean’    
const s = Symbol(‘s’)   typeof s // ‘symbol’
```
2. 判断函数
```js
// 能判断函数
typeof console.log  // ‘function’
```
3. 判断是否是引用类型
```js
// 能识别引用类型
typeof null         // ‘object’
typeof [‘a’,’b’]    // ‘object’
typeof { x: 100 }   // ‘object
```
### 手写写深拷贝

```js
const obj1 = {
  age: 20,
  name: 'xxx',
  address: {
    city: 'beijing'
  },
}

const obj2 = deepClone(obj1);
obj2.address.city = 'shanghai';
console.log(obj1.address.city);
console.log(obj2.address.city);

function deepClone (obj) {
  if (typeof obj !== 'object' || obj == null) {
    // obj是null,或者不是对象和数组，直接返回
    return obj;
  }

  // 初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 保证 Key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      //递归调用
      result[key] = deepClone(obj[key]);
    }
  }

  // 返回结果
  return result;
}
```
### 类型转换
1. 字符串拼接
    ```js
    const a = 100 + 10; // 110 
    cosnt b = 100 + ‘10’; // ‘10010’
    const c = true + ‘10’; // ‘true10’  
    ```
2. ==
    ```js
    100 == ‘100’ // true
    0 == ‘’     // true
    0 == false // true
    false == ‘’ // true
    null == undefined // true
    
    // 除了 == null之外， 其他一律用 === ，例如: 
    const obj = { x: 100 };
    if (obj.a == null) {}
    // 相当于：
    // if (obj.a === null || obj.a === undefined){} 
    ```
3. if语句和逻辑运算
    - truly变量和falsely变量
        - truly变量: !!a === true 的变量
        - falsely变量:  !!a === false 的变量
    ```js
    // 以下是 false变量，除此之外都是truly变量
    !!0 === fasle
    !!NaN === fasle
    !!’’ === false
    !!null === false
    !!undefined === false
    !!false === false
    ``` 
    - if语句
        ```js
        // truly变量
        const a = true
        if (a) {
            // .....
        }
        
        const b = 100;
        if (b) {
            // .....
        }
        
        // falsely变量
        const c = ‘’
        if(c) {
            // ...
        }
        
        const d = null
        
        if(d) {
            // ......
        }
        
        let e 
        if (e) {
            // ......
        }
        ```
    - 逻辑变量
        ```js
            console.log(10 && 0) // 0
            console.log(‘’ || ‘abc’) // ‘abc’
            console.log(!window.abc) // true
        ```
### 题目
    1. tpyeof类型判断哪些类型
     - 识别所有值类型
     - 识别函数
     - 判断是否是引用类型
    2. 何时用 === 何时用 ==
    ```js
    // 除了 == null之外， 其他一律用 === ，例如: 
    const obj = { x: 100 };
    if (obj.a == null) {}
    // 相当于：
    // if (obj.a === null || obj.a === undefined){}
    ```
    3. 值类型和引用类型的区别
    ```js
    const obj1 = { x: 100, y: 200}
    const obj2 = obj1;
    let x1 = obj.x
    obj2.x = 101
    x1 = 102
    console.log(obj1)  // { x: 101 }  
    ```
    4. 手写深拷贝
        - 注意判断值类型和引用类型
        - 注意判断是数组还是对象
        - 递归
### 本章小结
- 值类型 vs 引用类型，堆栈模型，神拷贝
- typeof运算符
- 类型转换，truly和falsely变量
## JS基础-原型和原型链
### 题目
1. 如果准确判断一个变量是不是素数组？
2. 手写一个简易的jQuery，考虑插件和扩展性
3. class的原型本质，怎么理解？
### 知识点
- class和继承
    - 要求手写继承
- 类型判断instanceof
```js
Hzy instanceof Student // true
Hzy instanceof People // true
Hzy instanceof Object // true
[] instanceof Array // true
[] instanceof Object // true
{} instanceof Object // true
```
- 原型和原型链
**原型**
```js
// class 实际上是函数，可见是语法糖
typeof People // ‘function’
typeof Student // ‘function’
// 隐式原型
console.log( xialuo.__proto__ );
console.log( Student.prototype );
console.log( xialuo.__proto__ === Student.prototype)
```
![20200810235013](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200810235013.png)

**原型关系**
- 每个class都有显示原型prototype
- 每个实例都有隐式原型 __proto__
- 实例的__proto__指向对应class的prototype

**基于原型的执行规则**
- 获取属性xialuo.name 或 执行方法 xialuo.sayhi()时
- 先在自身属性和方法寻找
- 如果找不到则自动去__prototype__中查找

**原型链**
``` JS
console.log( Student.prototype.__proto__);
console.log( People.prototype);
console.log( People.prototype === Student.prototype.__proto__);
```

![20200814214812](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200814214812.png)

*instanceof原理*
举个例子: 
``` JS
xialuo instanceof xxxxx
// 能获取遇到显示原型的话，那么isntaceof为true，获取不到位false
```

**重要提示**
- class是ES6语法规范，由ECMA委员会发布。
- ECMA只规定语法规则，即我们代码的书写规范，不规定如何实现。
- 以上实现方式都是V8引擎的实现方式，也是主流。

### 题目
1. 如何准确判断一个变量是不是数组？
  - instanceof

2. 手写一个简易的jQuery，考虑插件和扩展性

3. class原型本质，怎么理解？
- ![20200814214812](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200814214812.png)
- 属性和方法的执行规则