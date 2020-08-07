# 类
1. 类只能new

Class constructor Child cannot be invoked without 'new'
2. 类可以继承公有私有和静态方法
3. 父类的构造函数中返回了一个引用类型会把这个引用类型作为子类的this

```js
class Parent {
    // 构造器
    constructor() {
        this.name = 'parent';
        return { a: 1 };
    }
    static b() {
        return 2;
    }
    eat() {
        console.log('eat');
    }
}
class Child extends Parent { // 要求继承父亲的私有和公有
    constructor() {
        super(); // Parent.call(this);
        this.age = 9; // 私有属性
    }
    static a() { // 静态属于类上的方法
        return 1;
    }
    smoking() { // 原型上的方法
        console.log('smoking')
    }
}
let child = new Child();
console.log(child);
```

## 类的调用检测

```js
// 类的调用检测 检测实例是不是new出来的
function _classCallCheck(instance, constructor) {
  if (!(instance instanceof constructor)) {
    throw new Error('Class constructor Child cannot be invoked without new')
  }
}
// construtor 是构造函数
// protoPropertys  是原型方法的描述
// staticPropertys 是静态方法的描述
function definePropertys(target,arr) {
    for(let i = 0;i<arr.length;i++){
      Object.defineProperty(target, arr[i].key,{
        ...arr[i],
        configurable:true,
        enumerable:true,
        writable:true
      })
    }
}
function _createClass(constructor, protoPropertys, staticPropertys) {
  if (protoPropertys.length>0){
    definePropertys(constructor.prototype, protoPropertys)
  }
  if (staticPropertys.length>0){
    definePropertys(constructor, staticPropertys)
  }
}
let Parent = function () {
  // 写逻辑
  function P() {
    _classCallCheck(this, P);
    this.name = 'parent';
    return {}
  }
  _createClass(P, // 属性描述器
    [
      {
        key: 'eat',
        value: function () {
          console.log('吃')
        }
      }
    ],
    [
      {
        key:'b',
        value:function () {
          return 2;
        }
      }
    ]
  )
  return P;
}();
```
## 子类继承父类
```js
// 子类继承父类
function _inherits(subClass,superClass) {
  // 继承公有属性
  subClass.prototype = Object.create(superClass.prototype,{constructor:{value:subClass}});
  // 继承静态方法
  Object.setPrototypeOf(subClass,superClass);
}
let Child = (function (Parent){
  // 先实现继承父类的公有属性和静态方法
  _inherits(C,Parent);
  function C() {
    _classCallCheck(this,C);
    let obj = Parent.call(this);
    let that = this;
    if(typeof obj === 'object'){
      that = obj;
    }
    that.age = 9; //  解决了父类返回一个引用类型的问题
    return that;
  }
  return C;
})(Parent);
let child = new Child();
console.log(child);
```