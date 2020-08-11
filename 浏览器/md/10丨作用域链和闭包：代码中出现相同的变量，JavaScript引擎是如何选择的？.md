# 10丨作用域链和闭包：代码中出现相同的变量，JavaScript引擎是如何选择的？
![20200620203158](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203158.png)
**我们这篇文章来了解下什么是作用域链，什么是闭包？**

让我们来看段代码：
```JavaScript
function bar() {
    console.log(myName)
}
function foo() {
    var myName = " 极客邦 "
    bar()
}
var myName = " 极客时间 "
foo() // 极客时间
```

来看下调用栈图：

![20200620203206](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203206.png)
<center>执行 bar 函数时的调用栈
</center>

根据我们之前所学的，查找栈顶是否存在myName变量，然后往下找foo函数，然后在找全局执行上下文。

## 作用域链

每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为**outer**。


![20200620203222](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203222.png)
<center>带有外部引用的调用栈示意图
</center>

那么问题又来了，foo 函数调用的 bar 函数，那为什么 bar 函数的外部引用是全局执行上下文，而不是 foo 函数的执行上下文？

**这个问题和词法作用域有关，JavaScript执行过程，作用域链是由词法环境决定的**

## 词法作用域

词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。

咱们来看图：

![20200620203230](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203230.png)
<center>词法作用域
</center>

整个词法作用域链的顺序是：foo 函数作用域—>bar 函数作用域—>main 函数作用域—> 全局作用域。
***
既然这么说，那么为什么前面的代码是，foo 函数调用了 bar 函数，那为什么 bar 函数的外部引用是全局执行上下文，而不是 foo 函数的执行上下文?

**答**： foo 或者 bar 函数使用了一个它们没有定义的变量，那么它们会到全局作用域去查找。也就是说，词法作用域是代码阶段就决定好的，和函数是怎么调用的没有关系。

## 块级作用域中的变量查找

在块级作用域中，你使用了一个在当前作用域中不存在的变量，这时 JavaScript 引擎就需要按照作用域链在其他作用域中查找该变量。

我们再来看段代码：
```JavaScript
function bar() {
    var myName = " 极客世界 "
    let test1 = 100
    if (1) {
        let myName = "Chrome 浏览器 "
        console.log(test)
    }
}
function foo() {
    var myName = " 极客邦 "
    let test = 2
    {
        let test = 3
        bar()
    }
}
var myName = " 极客时间 "
let myAge = 10
let test = 1
foo()
```
我们来回顾一下，let 或者 const 声明的变量，那么变量就会存放到该函数的词法环境中。

![20200620203242](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203242.png)
<center>块级作用域中是如何查找变量的
</center>

- 首先是在 bar 函数的执行上下文中查找。
- 其次，就在 bar 函数的外部作用域中查找，也就是全局作用域。

## 闭包

我们来看段代码：
```JavaScript
function foo() {
    var myName = " 极客时间 "
    let test1 = 1
    const test2 = 2
    var innerBar = {
        getName:function(){
            console.log(test1)
            return myName
        },
        setName:function(newName){
            myName = newName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName(" 极客邦 ")
bar.getName()
console.log(bar.getName())
```
我们来看下上段代码的调用栈：

![20200620203252](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203252.png)
<center>执行到 return bar 时候的调用栈
</center>

我们可以看到foo函数定义来，两个方法一个是getName，一个是setName。并且这两个方法都使用来 myName 和 test1。
***
当foo函数执行完成以后：

![20200620203259](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203259.png)
<center>闭包的产生过程
</center>

从上图可以看出，foo 函数执行完成之后，其执行上下文从栈顶弹出了，但是由于返回的 setName 和 getName 方法中使用了 foo 函数内部的变量 myName 和 test1，所以这两个变量依然保存在内存中。

<font color=red size=10>闭包</font>

**在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。**


![20200620203306](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203306.png)
<center>执行 bar 时调用栈状态
</center>

从图中可以看出，setName 的执行上下文中没有 myName 变量，foo 函数的闭包中包含了变量 myName，所以调用 setName 时，会修改 foo 闭包中的 myName 变量的值。

同样的流程，当调用 bar.getName 的时候，所访问的变量 myName 也是位于 foo 函数闭包中的。

通过“开发者工具”来看看闭包的情况，打开 Chrome 的“开发者工具”，在 bar 函数任意地方打上断点，然后刷新页面，可以看到如下内容：

![20200620203313](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203313.png)
<center>开发者工具中的闭包展示
</center>

Local 就是当前的 getName 函数的作用域，Closure(foo) 是指 foo 函数的闭包，最下面的 Global 就是指全局作用域，从“Local–>Closure(foo)–>Global”就是一个完整的作用域链。

## 闭包是怎么回收的

闭包会导致内存泄漏。当你使用了闭包，这个闭包以后不再使用的话，就会造成内存泄漏。
在使用闭包的时候，我们要尽量注意一个原则：**如果该闭包会一直使用，那么它可以作为全局变量而存在；但如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量。**
