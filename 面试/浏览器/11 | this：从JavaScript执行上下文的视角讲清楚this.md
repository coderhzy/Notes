## 11 | this：从JavaScript执行上下文的视角讲清楚this


**注意点**
明确作用域链和this是完全独立的系统，两者没有关系。

### 执行上下文
了解下执行上下文的图示
![执行上下文](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200925162019.png)

作用域链的顶端和this的唯一交点是window对象。

### this
1. 通过函数的call方法，foo.call(bar)。意思就是foo函数内部的this指向bar对象。（bar内部的属性值会被foo函数的内部的代码覆盖。）
2. 通过对象调用方法设置。这里的this会因为对象的调用方法来指向a对象。
eq:1
``` JS
var a = {
  showThis: funtion(){
    console.log(this);
  }
}
a.shownThis()
```
eq:2 ==> 改变调用方式
``` JS
var a = {
  showThis: funtion(){
    console.log(this);
  }
}
var foo = a.shownThis;
foo();
```
此时的this指向全局

<font color=red>总结</font>
- 在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window。
- 通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身。

3. this通过构造函数中设置
``` JS
function CreateObj(){
  this.name = 'hello'
}
var myObj = new CreateObj();
```

上方new一个新对象发生了什么？
``` JS
var tempObj = {} 
CreateObj.call(tempObj)
return tempObj
```


### this的设计缺陷
1. 嵌套函数中的 this 不会从外层函数中继承

``` JS
var a = {
  name: 'hello'
  showThis: function(){
    console.log(this);
    function bar{
      console.log(this);
    }
    bar()
  }
}
a.showThis();
```
**函数bar中的this指向全局window对象，函数showThis中的this指向myObj对象**

解决上述this乱指向问题。
``` JS
var a = {
  name: 'hello'
  showThis: function(){
    console.log(this);
    var self = this;
    function bar{
      self.name = '极客邦'
    }
    bar()
  }
}

```


