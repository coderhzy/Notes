# 08 | 调用栈：为什么JavaScript代码会出现栈溢出？

## 执行上下文的三种情况
1. 执行全局代码 --> 创建全局执行上下文
2. 调用一个函数 --> 创建函数执行上下文 --> 函数执行结束销毁执行上下文
3. eval函数 --> eval代码会被编译 --> 创建执行上下文
**全局执行上下文**
![全局执行上下文](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200907073805.png)
- 在全局执行上下文中，取出add函数代码。
- 对add函数代码进行编译，并创建该函数的执行上下文和可执行代码。
- 执行代码，输出结果。
**函数调用过程**
![函数调用过程](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200907074641.png)

## 多个执行上下文怎么管理
JavaScript通过一种叫栈的数据结构来管理，多个执行上下文。
![栈示意图](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200907075346.png)


**分析代码**
``` JS
var a = 2;

function add(b,c){
  return b + c;
}

function addAll(b,c) {
  var d = 10;
  result = add(b,c);
  return a + result + d;
}

addAll(3,6);
```

- 第一步，创建全局上下文，并将其压入栈底。
![全局执行上下文压栈](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200907080224.png)
- 第二步。调用addAll函数,调用该函数时，JavaScript引擎会编译该函数，为其创建一个执行上下文。
![执行 addAll 函数时的调用栈](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200907081832.png)
- 第三步。当执行到 add 函数调用语句时，同样会为其创建执行上下文，并将其压入调用栈。
![执行 add 函数时的调用栈](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200907082158.png)
- 当add函数返回时，函数的执行上下文就会从栈顶弹出，并将result的值设置为add函数的返回值。
![add 函数执行结束时的调用栈](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200907082519.png)
- addAll 执行最后一个相加操作后并返回，addAll 的执行上下文也会从栈顶部弹出，此时调用栈中就只剩下全局上下文了
![addAll 函数执行结束时的调用栈](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200907082857.png)

**注意**
**调用栈是 JavaScript 引擎追踪函数执行的一个机制**


1. 栈溢出（stack Overflow）： 调用栈有大小
``` JS
var i = 0
function recursiveFn () {
  i++
  recursiveFn()
}
try {
  recursiveFn()
} catch (ex) {
  alert(`我的最大调用栈 i = ${i} errorMsg = ${ex}`)
}

// 15673 --->  chrome
```
