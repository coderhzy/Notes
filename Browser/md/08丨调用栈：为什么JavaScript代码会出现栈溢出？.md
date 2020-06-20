# 08 | 调用栈：为什么JavaScript代码会出现栈溢出？

**执行和编译的三种情况**

1. 当 JavaScript 执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生存周期内，全局执行上下文只有一份。
2. 当调用一个函数的时候，函数体内的代码会被编译，并创建函数执行上下文，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁。
3. 当使用 eval 函数的时候，eval 的代码也会被编译，并创建执行上下文。

栈溢出情况如下图：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172355c9871c4170-20200525154331759.png)
<center>栈溢出的错误
</center>

上图就是出现栈溢出，在JavaScript中就常见的就是函数，我们在写JavaScript函数时候，经常会用一个函数去调用另外一个函数。**调用栈就是来管理函数调用关系的数据结构**。那么什么函数调用和栈结构到底是什么呢？

## 什么是函数调用
函数调用就是运行一个函数。
```JavaScript
var a = 2
function add(){
var b = 10
return  a+b
}
add()
```

在执行add之前，JavaScript引擎会为上面这个代码创建全局执行上下文。如图：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/17235631e721c89d.png)
<center>全局执行上下文</center>

- 首先，从全局执行上下文中，取出 add 函数代码。
- 其次，对 add 函数的这段代码进行编译，并创建该函数的执行上下文和可执行代码。
- 最后，执行代码，输出结果。

**执行完整的流程图如下**

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/17235681d1403bb7.jpeg)
<center>函数调用过程</center>

当执行到add函数时候，我们就有了两个执行上下文。
1. 全局执行上下文
2. add函数执行上下文
***
**那么我们来考虑一下：JavaScript执行生成来多个执行上下文，那么怎么来管理呢？**

- 答：通过栈来管理。

## 什么是栈
相信大家看了下面到图就知道什么是栈，什么是入栈，什么是出栈来，在这额外说一下，栈是一种数据结构。如图：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172356d7aebf4391.png)
<center>栈示意图</center>

## 什么是 JavaScript 的调用栈
JavaScript引擎利用栈来管理执行上下文。执行上下文创建好之后，会将执行上下文压入栈中。我们通常把这种管理执行上下文到栈成为执行上下文栈，也叫**调用栈**。

我们来看下面这段代码：
```JavaScript
var a = 2
function add(b,c){
  return b+c
}
function addAll(b,c){
var d = 10
result = add(b,c)
return  a+result+d
}
addAll(3,6)
```

我们可以看出，上面代码在 addAll 函数中调用了 add 函数。那么调用栈的变化是 怎么样的呢？

1. **第一步，创建全局上下文，并将其压入栈底**。如下图所示：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/1723575f6f174406-20200525154623371.png)
<center>全局执行上下文压栈</center>

从图中你也可以看出，变量 a、函数 add 和 addAll 都保存到了全局上下文的变量环境对象中。


全局执行上下文压入到调用栈后，JavaScript 引擎便开始执行全局代码了。首先会执行 a=2 的赋值操作，执行该语句会将全局上下文变量环境中 a 的值设置为 2。设置后的全局上下文的状态如下图所示：


![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/1723579749213828.png)
<center>赋值操作改变执行上下文中的值</center>

2. **第二步是调用 addAll 函数**。当调用该函数时，JavaScript 引擎会编译该函数，并为其创建一个执行上下文，最后还将该函数的执行上下文压入栈中，如下图所示：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172357c71a676b8a.png)
<center>执行 addAll 函数时的调用栈</center>

addAll 函数的执行上下文创建好之后，便进入了函数代码的执行阶段了，这里先执行的是 d=10 的赋值操作，执行语句会将 addAll 函数执行上下文中的 d 由 undefined 变成了 10。

3.**第三步，当执行到 add 函数调用语句时，同样会为其创建执行上下文**，并将其压入调用栈，如下图所示：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172357f95dae3b9e.png)
<center>执行 add 函数时的调用栈
</center>

当 add 函数返回时，该函数的执行上下文就会从栈顶弹出，并将 result 的值设置为 add 函数的返回值，也就是 9。如下图所示：


![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/1723580c0dd24f72-20200525154832874.png)
<center>add 函数执行结束时的调用栈</center>

addAll 执行最后一个相加操作后并返回，addAll 的执行上下文也会从栈顶部弹出，此时调用栈中就只剩下全局上下文了。最终如下图所示：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/17235817e284d3d9.png)
<center>addAll 函数执行结束时的调用栈</center>

**整个 JavaScript 流程执行结束了。调用栈是 JavaScript 引擎追踪函数执行的一个机制，当一次有多个函数被调用时，通过调用栈就能够追踪到哪个函数正在被执行以及各函数之间的调用关系。**

## 在开发中，如何利用好调用栈

**1. 如何利用浏览器查看调用栈的信息**

- 你调bug的时候会用断点。查看的函数中加入断点，然后当执行到该函数时，就可以查看该函数的调用栈了。
- 打开“开发者工具”，点击“Source”标签，选择 JavaScript 代码的页面，然后在第 3 行加上断点，并刷新页面。你可以看到执行到 add 函数时，执行流程就暂停了，这时可以通过右边“call stack”来查看当前的调用栈的情况，如下图：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/1723587b8bdc12f3.png)
<center>查看函数调用关系
</center>

从图中可以看出，右边的“call stack”下面显示出来了函数的调用关系：栈的最底部是 anonymous，也就是全局的函数入口；中间是 addAll 函数；顶部是 add 函数。这就清晰地反映了函数的调用关系，所以在**分析复杂结构代码，或者检查 Bug 时，调用栈都是非常有用的。**

*除了断点，还可以调用函数来查看。*
- 使用 console.trace() 来输出当前的函数调用关系，比如在示例代码中的 add 函数里面加上了 console.trace()，你就可以看到控制台输出的结果，如下图：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172358979d2ae397.png)
<center>使用 trace 函数输出当前调用栈信息
</center>

**2. 栈溢出（Stack Overflow）**
**调用栈是有大小的**，当入栈的执行上下文超过一定数目，JavaScript 引擎就会报错，我们把这种错误叫做**栈溢出**。

下面我们来看一段代码:
```JavaScript
function division(a,b){
    return division(a,b)
}
console.log(division(1,2))
```

这段代码会出现栈溢出错误,如图：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172358bb4570c6ff-20200525155054306.png)
<center>栈溢出错误
</center>

抛出的错误信息为：超过了最大栈调用大小（Maximum call stack size exceeded）。

那么为什么会栈溢出：因为递归函数缺少终止条件，所以JavaScript引擎会一直创建新的函数执行上下文，并且一直反复的将其压入栈中，但是栈容量是有最大数量限制的，当超出栈的最大数量的时候就会出现栈溢出错误。因此，我们我们写代码的时候尽量避免使用递归。