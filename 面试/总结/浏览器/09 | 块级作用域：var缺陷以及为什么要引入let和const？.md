## 09 | 块级作用域：var缺陷以及为什么要引入let和const？

### 作用域
- **全局作用域**中对象在代码中的任何地方都能访问，生命周期伴随着页面的生命周期。
- **函数作用域**在函数内部定义的变量或者函数，定义的变量或者函数只能在函数内部被访问。函数执行结束以后，函数内部定义的变量会被销毁。

### let const
支持块级作用域
**let**
``` JS
function letTest() {
   let x = 1; 
   if (true) { 
     let x = 2; // 不同的变量 
     console.log(x); // 2
} 
     console.log(x); // 1}
```

**JavaScript 是如何支持块级作用域的**
``` JS
function foo(){
     var a = 1
     let b = 2
     {
          let b = 3 
          var c = 4
          let d = 5
          console.log(a)
          console.log(b)
     } 
     console.log(b)
     console.log(c)
     console.log(d)
}
foo()
```

**刚执行foo函数**
![20200924182314](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200924182314.png)
**执行foo函数内部作用域**
![20200924182423](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200924182423.png)
<font color=red>在词法环境内部，维护了一个小型栈结构，栈底是函数最外层的变量，进入一个作用域块后，就会把该作用域块内部的变量压到栈顶；当作用域执行完成之后，该作用域的信息就会从栈顶弹出，这就是词法环境的结构。</font>

**变量查找过程**
词法环境 —-> 变量环境
![20200924182906](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200924182906.png)
