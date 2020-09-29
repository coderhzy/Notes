## 10 | 作用域链和闭包 ：代码中出现相同的变量，JavaScript引擎是如何选择的？

### 作用域链
其实在每个执行上下文的变量环境中，都包含一个外部引用，用来指向外部的执行上下文，我们把这个外部引用成为outer。


**带有外部引用的调用栈**
![20200924184723](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200924184723.png)

### 词法作用域
词法 作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。
**词法作用域**
foo 函数作用域—>bar 函数作用域—>main 函数作用域—> 全局作用域。
![20200924185053](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200924185053.png)

### 作用域链的查找
内部 -> 外部 -> 全局


### 闭包
``` JS
function foo(){
  var myName = "极客时间"
  let test1 = 1 
  const test2 = 2 
  var a = {
    getName: function(){
      console.log(test1)
      retuen myName
    }
    setName:function(newName){
      myName = newName
    }
  }
  return a 
}
var bar = foo();
bar.setName("极客邦")
bar.getName()
console.log(bar.getName())
```


<font color=red>在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。</font>
<font color=blue>当函数嵌套时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局作用域下可访问时，就形成了闭包。</font>

**使用闭包注意**
如果该闭包会一直使用，那么它可以作为全局变量而存在；但如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量。


