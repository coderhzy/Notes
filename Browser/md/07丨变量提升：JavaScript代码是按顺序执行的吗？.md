# 07 | 变量提升：JavaScript代码是按顺序执行的吗？
![20200620202345](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202345.png)
我们学过JavaScript当然知道什么是执行上下们，只有理解了 JavaScrip 的执行上下文，你才能更好地理解 JavaScript 语言本身。**比如我们耳熟能详的变量提升、作用域和闭包。**

 **我们来看下面这段代码**
 ```JavaScript
showName()
console.log(myname)
var myname = '极客时间'
function showName() {
    console.log('函数 showName 被执行');
}
 ```
***
- 当执行到第 1 行的时候，由于函数 showName 还没有定义，所以执行应该会报错；
- 同样执行第 2 行的时候，由于变量 myname 函数也未定义，所以同样也会报错。

不过事实执行可结果可能不是这样。看下图：

![20200620202352](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202352.png)
<center>在声明之前使用函数和变量的执行结果</center>

- 第 1 行输出“函数 showName 被执行”
- 第 2 行输出“undefined”

**这个时候，我们发现执行顺序和我们想象中的不一样。**

通过上面结果我们不难发现，函数或者变量可以在定义之前使用的，那么我们试想下，如果使用没有定义的变量或者函数，JavaScript还可以正常执行吗？
```JavaScript
showName()
console.log(myname)
function showName() {
    console.log('函数 showName 被执行');
}
```
上面这段代码JavaScript引擎会报错：

![20200620202403](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202403.png)
<center>使用了未定义的变量——执行报错
</center>

所以我们可以得出三个结论
1. 没有声明直接使用，就会报错
2. 这个变量有声明，不过你在声明之前使用它了，这个时候也会输出undefined，记住这个在声明之前使用它，不是输出你声明的值。
3. 在一个函数定义之前使用它，不会出错，且函数能正确执行。

## 变量提升（Hoisting）

### 变量声明提升
下面我们来看段代码：
```JavaScript
var myname    // 声明部分
myname = '极客时间'  // 赋值部分
```
如下图所示：

![20200620202411](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202411.png)
<center>如何理解`var myname = '极客时间'`
</center>

**变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。**

### 函数提升
我们再来了解下函数声明
```JavaScript
function foo(){
  console.log('foo')
}
 
var bar = function(){
  console.log('bar')
}
```
如图：

![20200620202425](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202425.png)
<center>函数的声明和赋值
</center>

### 变量提升
```JavaScript
/*
* 变量提升部分
*/
// 把变量 myname 提升到开头，
// 同时给 myname 赋值为 undefined
var myname = undefined
// 把函数 showName 提升到开头
function showName() {
    console.log('showName 被调用');
}
 
/*
* 可执行代码部分
*/
showName()
console.log(myname)
// 去掉 var 声明部分，保留赋值语句
myname = '极客时间'
```

清楚点可以看下图：

![20200620202432](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202432.png)
<center>模拟变量提升示意图
</center>

- 第一处是把声明的部分都提升到了代码开头，如变量 myname 和函数 showName，并给变量设置默认值 undefined；
- 第二处是移除原本声明的变量和函数，如var myname = '极客时间'的语句，移除了 var 声明，整个移除 showName 的函数声明。

说的直白点就是，变量提升值的undefined，函数整体提升。

## JavaScript 代码的执行流程

实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中。JavaScript引，编译完成以后才会执行。

执行的流程图：

![20200620202509](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202509.png)
<center>JavaScript 的执行流程图
</center>

**1. 编译阶段**

我们将上面的代码分成两个部分：

**第一部分：变量提升部分的代码。**
```JavaScript
var myname = undefined
function showName() {
    console.log('函数 showName 被执行');
}
```

**第二部分：执行部分的代码。**
```JavaScript
showName()
console.log(myname)
myname = '极客时间'
```

下面我们就可以把 JavaScript 的执行流程细化，如下图所示：
![20200620202519](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202519.png)
<center>JavaScript 执行流程细化图
</center>

从图中我们可以看出，当你输入一段代码，经过编译后，会生成两部分的内容：
- 执行上下文
- 可执行代码

执行上下文是 JavaScript 执行一段代码时的运行环境，调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如 this、变量、对象以及函数等。在执行上下文中存在一个**变量环境的对象**（Viriable Environment），该对象中保存了变量提升的内容，比如上面代码中的变量 myname 和函数 showName，都保存在该对象中。

变量环境大概是这样：
```
VariableEnvironment:
     myname -> undefined, 
     showName ->function : {console.log(myname)
```

那么上面你看到了是变量环境。那么，代码是如何生成环境变量对象的呢？
```
showName()
console.log(myname)
var myname = '极客时间'
function showName() {
    console.log('函数 showName 被执行');
}
```

- 第 1 行和第 2 行，由于这两行代码不是声明操作，JavaScript 引擎不会做任何处理。
- 第3行，var声明，所以JavaScript引擎会在环境对象中创建一个叫myname的属性，并且赋值为undefined。
- 第4行，JavaScript引擎发现通过function定义定函数，所以它将函数定义并且存储到堆（heap）中，并且在环境对象中创建一个showName的属性，然后将这个属性值指向堆中函数的位置。

**那么通过上面的三步，就生成了变量环境对象**。那么在接下来JavaScript 引擎会把声明以外的代码编译为字节码。

```JavaScript
showName()
console.log(myname)
myname = '极客时间'
```
到了这个阶段，就有了执行上下文和可执行代码了，下面就要到执行阶段了。

***

**2. 执行阶段**
JavaScript 引擎开始执行“可执行代码”，按照顺序一行一行地执行。下面我们就来一行一行分析下这个执行过程：
- 当执行showName函数，JavaScript引擎在变量环境对象中来查找这个函数，由于变量环境对象中存在该函数的引用，然后执行这个函数，并且输出“函数 showName 被执行”结果。
- 然后打印“myname”信息，JavaScript 引擎继续在变量环境对象中查找该对象，由于变量环境存在 myname 变量，并且其值为 undefined，所以这时候就输出 undefined。
- 接下来执行第 3 行，把“极客时间”赋给 myname 变量，赋值后变量环境中的 myname 属性值改变为“极客时间”。

我们得到的变量环境如下图所示：
```
VariableEnvironment:
     myname -> " 极客时间 ", 
     showName ->function : {console.log(myname)
```
**以上就是一段代码的编译和执行流程。**


## 代码中出现相同的变量或者函数怎么办？
简单的解释就是后面覆盖前面的。

```
function showName() {
    console.log('极客邦');
}
showName();
function showName() {
    console.log('极客时间');
}
showName(); 
```
- **首先是编译阶段**。遇到了第一个 showName 函数，会将该函数体存放到变量环境中。接下来是第二个 showName 函数，继续存放至变量环境中，但是变量环境中已经存在一个 showName 函数了，此时，第二个 showName 函数会将第一个 showName 函数覆盖掉。这样变量环境中就只存在第二个 showName 函数了。
- **接下来是执行阶段**。先执行第一个 showName 函数，但由于是从变量环境中查找 showName 函数，而变量环境中只保存了第二个 showName 函数，所以最终调用的是第二个函数，打印的内容是“极客时间”。第二次执行 showName 函数也是走同样的流程，所以输出的结果也是“极客时间”。

**所以我们得出结论；一段代码如果定义了两个相同名字的函数，那么最终生效的是最后一个函数。**