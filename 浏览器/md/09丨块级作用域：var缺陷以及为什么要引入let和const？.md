# 09丨块级作用域：var缺陷以及为什么要引入let和const？
![20200620202911](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202911.png)
Es6通过引入作用域并配合let、const关键词来避开JavaScript存在变量提升的问题。

## 作用域（scope）
作用域在程序中定义变量的区域，该位置决定来变量的生命周期。作用域就是变量与函数的可访问范围，也就是说作用域控制着变量和函数的可见性和**生命周期**。

在ES6之前，ES的作用域只有两种。

- 全局作用域中的对象在代码的任何地方都可以被访问。
- 函数作用域就是函数被执行的时候，定义和变量，只能在函数内部被访问。当函数执行结束以后，函数内部定义的变量会被销毁。

不过在其他的编程语言中，都是支持**块级作用域**。
{}  = 块级作用域
```JavaScript
//if 块
if(1){}
 
//while 块
while(1){}
 
// 函数块
function foo(){
 
//for 循环块
for(let i = 0; i<100; i++){}
 
// 单独一个块
{}
```

我们知道，一个支持作用域的语言，代码块内部定义的变量在代码块外部是访问不到的，并且在代码块执行完成以后，代码块中定义的变量也会被销毁。

我们来看下下面这段C语言：
```C
char* myname = " 极客时间 ";
void showName() {
  printf("%s \n",myname);
  if(0){
    char* myname = " 极客邦 ";
   }
}
 
int main(){
   showName();
   return 0;
}
```

我们看这段C代码，最终打印的是上面的全局变量myname的值，这是因为C支持块级作用域，所以if块里面定义的变量是不可以被外面访问到的。但是和Java和C不同。JavaScript在之前是不支持块级作用域的。这就导致了函数中变量不论在哪里声明，在编译阶段都会被提取到执行上下文的变量环境中，**所以这些变量在整个函数体内任何地方都是被访问的，这也就是JavaScript中的变量提升**。

##  变量提升所带来的问题
**1. 变量容易在不被察觉的情况下被覆盖掉**
 JavaScript 来实现上面那段 C 代码，实现后的 JavaScript 代码如下：
 ```
var myname = " 极客时间 "
function showName(){
  console.log(myname);
  if(0){
   var myname = " 极客邦 "
  }
  console.log(myname);
}
showName()
//打印出来的是 undefined
 ```

 首先我们执行了showName函数调用时，执行上下文和调用栈。

![20200620202926](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620202926.png)
 <center>开始执行 showName 函数时的调用栈
</center>

 **首先执行**：
```
console.log(myname);
```
有两个 myname 变量：一个在全局执行上下文中，其值是“极客时间”；另外一个在 showName 函数的执行上下文中，其值是 undefined。在JavaScript函数肯定先调用函数内部变量，所以值是undefined。

**2.本应销毁的变量没有被销毁**
```JavaScript
function foo(){
  for (var i = 0; i < 7; i++) {
  }
  console.log(i); 
}
foo()
```
 C 语言或者其他的大部分语言实现类似代码，在 for 循环结束之后，i 就已经被销毁了，但是在 JavaScript 代码中，i 的值并未被销毁，所以最后打印出来的是 7。

 这是因为由于变量提升导致的，在创建执行上下文阶段，变量i已经提升了，所以for循环结束以后，变量i没有被销毁。

## ES6 是如何解决变量提升带来的缺陷

ES6 引入了 let 和 const 关键字，从而使 JavaScript 也能像其他语言一样拥有了块级作用域。


关于 let 和 const 的用法，你可以参考下面代码：
```
let x = 5
const y = 6
x = 7
y = 9 // 报错，const 声明的变量不可以修改
```

- let 关键字声明的变量是可以被改变的。
- const 声明的变量其值是不可以被改变的。
- 但是使用let和const都可以生成块级作用域。


下面我们来了解一下，关于ES6是怎样通过块级作用域来解决上述问题的：
```JavaScript
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}
varTest();
```
![20200620203022](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203022.png)
<center>varTest 函数的执行上下文</center>
我们从输出结果是都为2，那就说明我们在if{}里面用var定义的变量x影响到了在函数中的变量，这是我们不想看到的。

*那么我们应该怎样来改造代码呢，我们使用let*
```JavaScript
function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
letTest();
```

这段改用let来声明就达到了我们预期的效果。

## JavaScript 是如何支持块级作用域的

**为什Es6就支持块级作用域呢？**

我们来看下面这段代码:
```JavaScript
function foo(){
    var a = 1
    let b = 2
    {
      let b = 3
      var c = 4
      let d = 5
      console.log(a)  // 1 
      console.log(b)  // 3
    }
    console.log(b)    // 2
    console.log(c)   // 4
    console.log(d)   // undefined
}   
foo()
```

**第一步是编译并创建执行上下文**

![20200620203049](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203049.png)
<center>执行 foo 函数内部作用域块时的执行上下文</center>

- 函数内部通过 var 声明的变量，在编译阶段全都被存放到变量环境里面了。
- 通过 let 声明的变量，在编译阶段会被存放到词法环境（Lexical Environment）中。
- 在函数的作用域内部，通过 let 声明的变量并没有被存放到词法环境中。

**第二步继续执行代码**

变量环境中 a 的值已经被设置成了 1，词法环境中 b 的值已经被设置成了 2，这时候函数的执行上下文就如下图所示：

![20200620203059](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203059.png)
<center>执行 foo 函数内部作用域块时的执行上下文</center>

当进入函数的作用域块时，作用域块中通过 let 声明的变量，会被存放在词法环境的一个单独的区域中，这个区域中的变量并不影响作用域块外面的变量.比如在作用域外面声明了变量 b，在该作用域块内部也声明了变量 b，当执行到作用域内部时，它们都是独立的存在。

**let和const**，在词法环境内部，维护了一个小型栈结构，栈底是函数最外层的变量，进入一个作用域块后，就会把该作用域块内部的变量压到栈顶；当作用域执行完成之后，该作用域的信息就会从栈顶弹出，这就是词法环境的结构。

接着，console.log(a)执行，需要寻找a，寻找路径：从词法环境栈顶向下查询，没找到，则去变量环境中找。

**清楚查找课程看下图**

![20200620203108](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203108.png)
<center>变量查找过程</center>

**当作用域块执行结束之后，其内部定义的变量就会从词法环境的栈顶弹出，最终执行上下文如下图所示：**

![20200620203114](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200620203114.png)
<center>作用域执行完成示意图
</center>

块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了。

