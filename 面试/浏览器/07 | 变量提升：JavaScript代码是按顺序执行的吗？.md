# 07 | 变量提升：JavaScript代码是按顺序执行的吗？

## 执行顺序
1. 在执行过程中，若使用未声明变量，javaScript执行报错。
2. 在一个变量定义之前使用它，不会报错，这个变量值显示Undefined。
3. 在一个函数定义之前使用它，不会出错，函数正常执行。

## 变量提升
**变量声明**
``` JS
var myname // 声明部分
myname = '极客时间' //赋值部分
```

![20200906104350](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200906104350.png)

**函数声明**
``` JS
// 函数声明
function foo(){
  console.log('foo');
}

// 函数声明赋值给变量
var bar = function (){
  console.log('bar');
}
```

![20200906104751](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200906104751.png)


## 什么是变量提升
所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。

**模拟变量提升示意图**
![20200906105239](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200906105239.png)

## JavaScript 代码的执行流程
**实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中。**
![20200906105440](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200906105440.png)

*1. 编译阶段*

变量提升部分的代码
``` JS
var myname = undefined
function showName() {
  console.log('函数showName执行');
}
```

执行部分代码
``` JS
showName()
console.log(myname)
myname = '极客时间'
```

![20200906105815](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200906105815.png)


## 代码执行分析

**1. 声明阶段**
``` JS
showName()
console.log(myname)
var myname = '极客时间'function showName() {
   console.log('函数showName被执行');
}
```

- 第一行第二行不是声明，JavaScript不执行操作。
- 第三行，是var声明，JavaScript引擎将环境对象中创建一个叫myname的属性，并使用undefined进行初始化。
- 第四行JavaScript引擎，将函数定义存在堆(Heap)中，并在环境变量中创建一个showName的属性。**最后该属性值指向堆中函数的位置**

**注意**
JavaScript引擎会把声明以外的代码编译为字节码。

**2.执行阶段**
按照顺序一行行执行。
1. JavaScript引擎来在变量环境对象中查找这个函数。找到这个函数引用，就执行这个函数。
2. 直接执行打印‘myname’，JavaScript引擎继续在变量环境对象中查找myname变量，值为undefined，输出undefined
3. 将“极客时间”赋值给myname变量，这个时候变量环境中的myname属性值改为极客时间。

## 代码中出现相同的变量或者函数怎么办？
后者声明函数或者变量会覆盖之前定义的。

<font color=red>注意</font>
**核心： JavaScript代码先编译再执行。**