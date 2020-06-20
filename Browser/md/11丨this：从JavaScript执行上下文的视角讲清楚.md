# 11丨this：从JavaScript执行上下文的视角讲清楚
```JavaScript
var bar = {
    myName:"time.geekbang.com",
    printName: function () {
        console.log(myName)
    }    
}
function foo() {
    let myName = " 极客时间 "
    return bar.printName
}
let myName = " 极客邦 "
let _printName = foo()
_printName()
bar.printName()
```

 printName函数中，打印的myName是全局作用域的“极客邦”。
 但是按照常理来说，调用bar.printName，该方法内部的变量 myName 应该使用 bar 对象中的，因为他们是一个整体。下面使用C++改写的这段代码：
 ```C++
#include <iostream>
using namespace std;
class Bar{
    public:
    char* myName;
    Bar(){
      myName = "time.geekbang.com";
    }
    void printName(){
       cout<< myName <<endl;
    }  
} bar;
 
char* myName = " 极客邦 ";
int main() {
	bar.printName();
	return 0;
}
 ```

 上面这段C++代码，调用bar.printName方法，打印出来的是time.geekbang.com，并不是外面定义的myName的值，“极客邦”。在对象内部的方法中使用对象内部的属性是一个非常普遍的需求。不过在JavaScript 的作用域机制并不支持这一点，基于这个需求，JavaScript 用一套this 机制。


那么，我们在 JavaScript 中可以使用 this 实现在 printName 函数中访问到 bar 对象的 myName 属性了。
```Javascript
printName: function () {
        console.log(this.myName)
    }    
```

提前说一下：作用域链和this是两套不同的系统，它们之间基本没太多联系。

**JavaScript 中的 this 是什么**

this的地位：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172445fbac55d03a.png)
<center>执行上下文中的 this</center

this 是和执行上下文绑定的，也就是说每个执行上下文中都有一个 this。this 也只有这三种——全局执行上下文中的 this、函数中的 this 和 eval 中的 this。

- **全局执行上下文中的 this**

在控制台中输入console.log(this)来打印出来全局执行上下文中的 this，最终输出的是 window 对象。所以你可以得出这样一个结论：全局执行上下文中的 this 是指向 window 对象的。这也是 this 和作用域链的唯一交点，作用域链的最底端包含了 window 对象，全局执行上下文中的 this 也是指向 window 对象。

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/17244678481ee39d.png)
<center>全局执行上下文中的this</center>

- **函数执行上下文中的 this**
下面我们来看下函数执行上下文中的this，来看看代码：
```JavaScript
function foo(){
  console.log(this)
}
foo()
```

 foo 函数内部打印出来 this 值，执行这段代码，打印出来的也是 window 对象，这说明在默认情况下调用一个函数，其执行上下文中的 this 也是指向 window 对象的。

**1. 通过函数的 call 方法设置**

通过函数的call方法来设置函数执行上下文的 this 指向，比如下面这段代码，我们就并没有直接调用 foo 函数，而是调用了 foo 的 call 方法，并将 bar 对象作为 call 方法的参数。
```JavaScript
let bar = {
  myName : " 极客邦 ",
  test1 : 1
}
function foo(){
  this.myName = " 极客时间 "
}
foo.call(bar)
console.log(bar)
console.log(myName)
```

执行这段代码，然后观察输出结果，你就能发现 foo 函数内部的 this 已经指向了 bar 对象，因为通过打印 bar 对象，可以看出 bar 的 myName 属性已经由“极客邦”变为“极客时间”了，同时在全局执行上下文中打印 myName，JavaScript 引擎提示该变量未定义。除了call，还有bind和apply方法。

**2. 通过对象调用方法设置**

要改变函数执行上下文中的 this 指向，除了通过函数的 call 方法来实现外，还可以通过对象调用的方式，比如下面这段代码：

```
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
  }
}
myObj.showThis()
```

在这段代码中，我们定义了一个 myObj 对象，该对象是由一个 name 属性和一个 showThis 方法组成的，然后再通过 myObj 对象来调用 showThis 方法。执行这段代码，你可以看到，最终输出的 this 值是指向 myObj 的。

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/12.png)
<center>上面代码执行结果</center>

**使用对象来调用其内部的一个方法，该方法的 this 是指向对象本身的。**

你也可以认为 JavaScript 引擎在执行myObject.showThis()时，将其转化为了：

```JavaScript
myObj.showThis.call(myObj)
```

那么我们showThis 赋给一个全局对象，然后再调用该对象，代码如下所示：

```JavaScript
var myObj = {
  name : " 极客时间 ",
  showThis: function(){
    this.name = " 极客邦 "
    console.log(this)
  }
}
var foo = myObj.showThis
foo()
```

**你会发现现在this指向了window。**
![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/2020052516134.png)

<center>执行结果</center>

***
通过以上两个例子的对比，我们可以知道:

- 在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window。
- 通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身。

**3. 通过构造函数中设置**

我们来看下这段代码：

```JavaScript
function CreateObj(){
  this.name = " 极客时间 "
}
var myObj = new CreateObj()
```

在上面这段代码中，使用new创建了对象myObj，那构造函数CreateObj中的this指向谁？

**当执行 new CreateObj() 的时候，JavaScript 引擎做了如下四件事：**

- 首先创建了一个空对象 tempObj；
- 接着调用 CreateObj.call 方法，并将 tempObj 作为 call 方法的参数，这样当 CreateObj 的执行上下文创建时，它的 this 就指向了 tempObj 对象；
- 然后执行 CreateObj 函数，此时的 CreateObj 函数执行上下文中的 this 指向了 tempObj 对象；
- 最后返回 tempObj 对象。

为了直观理解，我们可以用代码来演示下：

```JavaScript
  var tempObj = {}
  CreateObj.call(tempObj)
  return tempObj
```


## this 的设计缺陷以及应对方案

**1. 嵌套函数中的 this 不会从外层函数中继承**

我们来看一段代码:
```JavaScript
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    function bar(){
        console.log(this)
    }
    bar()
  }
}
myObj.showThis()
```

**函数 bar 中的 this 指向的是全局 window 对象，而函数 showThis 中的 this 指向的是 myObj 对象。这就是 JavaScript 中非常容易让人迷惑的地方之一，也是很多问题的源头。**

你可以通过一个小技巧来解决这个问题，比如在 showThis 函数中声明一个变量 self 用来保存 this，然后在 bar 函数中使用 self，代码如下所示：
```JavaScript
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    var self = this
    function bar(){
      self.name = " 极客邦 "
    }
    bar()
  }
}
myObj.showThis()
console.log(myObj.name)
console.log(window.name)
```

上面这段代码。myObj 中的 name 属性值变成了“极客邦”。其实，这个方法的的本质是把 this 体系转换为了作用域的体系。

ES6 中的箭头函数来解决这个问题，结合下面代码:
```
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    var bar = ()=>{
      this.name = " 极客邦 "
      console.log(this)
    }
    bar()
  }
}
myObj.showThis()
console.log(myObj.name)
console.log(window.name)
```

箭头函数 bar 里面的 this 是指向 myObj 对象的。这是因为 ES6 中的箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。

***
**2. 普通函数中的 this 默认指向全局对象 window**

**最好的方法**：在JavaScript中调用函数，执行上下文中的 this 是默认指向全局对象 window 的。让函数执行上下文中的 this 指向某个对象，最好的方式是通过 call 方法来显示调用。   

这个问题可以通过设置 JavaScript 的“严格模式”来解决。在严格模式下，默认执行一个函数，其函数的执行上下文中的 this 值是 undefined，这就解决上面的问题了。

**总结：**
- 当函数作为对象的方法调用时，函数中的 this 就是该对象；
- 当函数被正常调用时，在严格模式下，this 值是 undefined，非严格模式下 this 指向的是全局对象 window；
- 嵌套函数中的 this 不会继承外层函数的 this 值。