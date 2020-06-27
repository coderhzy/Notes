[toc]
## 组件的组成-属性
![20200623120655](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200623120655.png)
## 定义组件
![20200623120738](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200623120738.png)
## 使用组件
![20200623120952](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200623120952.png)

## 组件组成-事件
![20200623121306](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200623121306.png)
### 事件
![20200623121424](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200623121424.png)

### 组件组成-插槽
![20200623121643](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200623121643.png)

![20200623121816](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200623121816.png)

## 双向绑定和单向数据流
![20200627103335](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627103335.png)

![20200627103359](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627103359.png)

**Vue是单向数据流，Vue的语法糖是双向绑定**

![20200627103428](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627103428.png)

![20200627104547](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627104547.png)

## 虚拟DOM和key属性的作用
![20200627104728](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627104728.png)

![20200627104744](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627104744.png)


## virtual DOM
![20200627104858](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627104858.png)

**只比对同级结点**
![20200627105033](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105033.png)

**场景一**
![20200627105046](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105046.png)

**场景二**
![20200627105119](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105119.png)

**场景三**
![20200627105208](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105208.png)

**场景四（无key）**
![20200627105224](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105224.png)

**场景五（有key）**
![20200627105331](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105331.png)

**场景六 插入**
![20200627105359](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105359.png)

*问：为什么不能用index作为key*

## 如何触发组件更新
![20200627105559](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105559.png)

**数据来源**
![20200627105653](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105653.png)

**状态data vs 属性 props**
![20200627105723](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105723.png)

**非响应式**
![20200627105920](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627105920.png)

**响应式（return）**
![20200627110009](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627110009.png)

**什么情况更新**
![20200627110252](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627110252.png)


**响应式更新**
在组件渲染的时候，会将用到的数据放到Watcher里面。所以当我们用到某个数据的时候，才会触发更新。
![20200627110426](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627110426.png)

*问：数组有哪些方法支持响应式更新，如果不支持如何处理，底层原理如何实现*

## 合理应用计算属性和侦听器
**计算属性**
computed
![20200627110804](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627110804.png)

**Demo**
![20200627111224](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627111224.png)

**侦听器**
![20200627111346](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627111346.png)

**Demo嵌套调用**
![20200627111456](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627111456.png)

![20200627111527](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627111527.png)

**侦听器watch**
![20200627111652](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627111652.png)

**computed vs watch**
![20200627111713](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627111713.png)

![20200627111844](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627111844.png)

![20200627111948](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627111948.png)

**computed 和 watch 选择**
![20200627112023](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627112023.png)


## 声明周期和应用场景和函数式组件
**生命周期**
![20200627112146](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627112146.png)

**创建阶段**
![20200627112217](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627112217.png)
在mounted以后，Vue不承诺子组件也会挂在到DOM上。所以我们有的时候用到this.$nextTick()，来异步回调。

**更新阶段**
![20200627113103](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627113103.png)

**销毁阶段**
![20200627115931](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627115931.png)

**函数式组件**
![20200627120209](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627120209.png)

**demo**
![20200627120542](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627120542.png)

![20200627120617](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200627120617.png)