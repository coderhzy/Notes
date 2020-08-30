[toc]
# react基础
[react文档](https://zh-hans.reactjs.org/docs/getting-started.html)
## 起源
1. Facebook推出，2013年开源，函数式编程，使用人数最多的前端框架，健全的文档与完善的社区，React Fiber - react16版本，入门易，精通难。

## 开发环境搭建
- 安装node.js
- npm配置
- 安装yarn
- 安装脚手架Create-react-app
```js
npx install create-react-app -g
```
- 创建项目:
```js
npx create-react-app todolist
```
- 运行项目:
```js
cd todolist
yarn start
```
![20200715123009](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200715123009.png)

## 工程目录讲解
![20200715123623](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200715123623.png)

- node_modules依赖文件，基本进行配置，默认就好。
- public，存放一些公用资源。
- src，这个目录主要是我们编写代码的目录。
- Appp.test.js：做自动化测试js文件。
- index.js主入口函数。
- PWA：progressive web application,在入口文件index.js中引入serviceWorker，缓存第一次加载网页。
- React.StrictMode开启React严格模式。
- manifest.json是提供给用户在桌面上新增图标。
```js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
- package.json:node的包文件基本
- gitignore:忽略上传到Git的文件
- README：可自定义。


## JSX
- 一种语法糖—React.createElement()
- ReactElement对象
- JSX{}里面是JS表达式，不能是语句
- JSX注释写法: {/* */} 或者
{
  //
}
- Fragment: 占位符，包裹所有标签不被解析显示。

## State
- this.State() = ({ })
- 变更数据项:setState({ })


## 事件绑定

**事件绑定及优化**

- 事件绑定要用bind(this)来**变更**this的指向，优化写在constructor中。

**实现todoList，拓展**

- dangerouslySetInnerHTML={{__html: item}}，不转义直接按照标签样子显示。<h1>hello world</h1>
![20200710201028](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200710201028.png)
- htmlfor，在lable标签扩大输入框范围
```js
<label htmlFor='insertArea'>输入内容</label>
<input
    id="insertArea"/>
```

## 父子组件传值
![20200715143713](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200715143713.png)
### 父组件传值和子组件获取
父组件
```js
constructor(props){
  super(props)
  this.state={
    message:"parent"
  }
}
render(){
  return(
        <Child content={this.state.message}/>
  )
}
}
```

子组件
```js
render(){
  return(
        <p>{this.props.txt}</p>
  )
}
```

<font color='red'>父组件还可以给子组件传入方法，子组件将数据传入接收到的方法中改变数据，从而达到改变父组件的目的。</font>注意:this


### 属性校验
#### propTypes
```js
//引入
import PropTypes from 'prop-types'
//使用
TodoItem.propTypes = {
  content: PropTypes.string // 接收的content必须是string
}
```
#### defaultProps
```js
TodoItem.defaultProps = {
  content: 'hello world' // 没有接收content则默认显示hello world
}

```

### props,state,rende关系
当组件的state或者props发生改变的时候，render函数就会被重新执行。

## 虚拟DOM
**planFirst（非虚拟DOM）**
1. state数据
2. JSX 模版
3. 数据 + 模版 结合，生成真实DOM，来显示
4. state 发生改变
5. 数据 + 模版 结合，生成真实DOM，替换原始DOM


缺陷：
第一次生成一个完整的DOM片段
第二次生成一个完成的DOM片段
第二次的DOM替换第一次的DOM，非常耗费性能

**planSecond**
1. state数据
2. JSX 模版
3. 数据 + 模版 结合，生成真实DOM，来显示
4. state 发生改变
5. 数据 + 模版 结合，生成真实DOM，并不直接替换原始DOM
6. 新的DOM（DocumentFragment） 和原始DOM 做对比，找差异
7. 找出input框发生了变化
8. 只用新的DOM中的input元素，替换掉老的DOM中的input元素。

缺陷：
性能的提升不明显

**planThird**
1. state数据
2. JSX 模版
3. 生成虚拟DOM（虚拟DOM就是一个js对象，用它来描述真实DOM）
['div',{id : 'abc'},['span',{},'hello world']]
4. 用虚拟DOM的结构生成真实DOM。来显示。
<div id = 'asd'><span>hello world</span></div>

5. state 发生改变
6. 数据 + 模版 生成新的虚拟DOM (极大提升了性能)
['div',{id : 'abc'},['span',{},'bye bye']]
7. 比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span的内容 （两个js对象来对比，极大提升了性能）
8. 直接操作DOM，改变span中的内容

**虚拟DOM优点**
1. 性能提升
2. 它使得跨端应用得以实现，React Native。 在react中虚拟DOM -> 真实DOM来渲染， 在原生应用中虚拟DOM -> 组件。

## Diff算法、key值
#### setState({})为什么要异步？
![20200715152512](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200715152512.png)
   
React中，如果连续三次调用setState的话，React会把三次的setState合并成一个setState，接着来执行，减少虚拟DOM比对次数，极大的提升来性能。

#### 什么是diff算法？
![20200715152757](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200715152757.png)
在React中，虚拟DOM树进行同级比对。例如：第一层一样，再比对第二层，如果第二层不一样，听着比对，删除第二层及第二层一下的虚拟DOM，替换成新的虚拟DOM。

#### key值为什么不可以是index？
**错误的key**
当React进行虚拟DOM的比对的时候，会出现下面这种情况。
```js
// 第一次
a b c d
0 1 2 3
// 操作删除c
a b d
0 1 2
```
从上面这段代码我们可以看出，我们第一次创建来a b c d分别对应索引值0 1 2 3，但当我们删除c，这个时候每项对应的索引则变成012。对应索引就与之前不同来，此时的key值就失去了key值的意义了。

**正确的key**
```js
// 第一次
a b c d
a b c d
// 操作删除c
a b d
a b d
```
上方这段代码，我们删除c，对应的索引也不会改变。一个稳定的key值，可以提升虚拟DOM的比对,从而提升性能。


### ref
不推荐使用，ref。ref获取DOM节点。不过React推荐是更改数据来驱动DOM。

```js
render() {
    return (
      <div>
        <input ref={(input) => {this.input = input}}/>
      </div>
    );
// e.target可以用this.input来代替了
console value = this.input.value;
```
如果非要使用ref来更改DOM，推荐将操作放到异步函数中执行。如：setState的第二个参数。



## React生命周期函数-三个阶段
![20200715155918](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200715155918.png)


### Mounting
![20200712105953](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200712105953.png)
```js
    // 生命周期函数,在组件即将被挂载到页面之前自动执行
    componentWillMount() {
        console.log('componentWillMount');
    }

    render // 页面被渲染或者重新渲染都会被执行

    // 生命周期函数,在组件即将被挂载到页面时候自动执行
    componentDidMount() {
        console.log('componentDidMount');
    }
```
### Updation
![20200712110610](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200712110610.png)
```js
    // 当一个组件要从父组件接受参数
    // 如果这个组件第一次存在与父组件中，不会执行
    // 如果这个组件之前已经存在于父组件中，才会执行
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }

    // 组件被更新之前，他会被自动执行
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate');
        return true;
    }

    // 组件被更新之前，他会自动执行，但是他在shouldComponentUpdate之后
    // 如果shouldComponentUpdate返回true才会执行
    // 如果shouldComponentUpdate返回false不会执行
    componentWillUpdate(){
        console.log('componentWillUpdate')
    }

        // 组件更新完成之后，他会被执行
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }
```

### UnMounting
![20200715161652](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200715161652.png)
```js
    // 一个组件被移除
    componentWillUnmount(){
        console.log('child componentWillUnmount')
    }
```
#### shouldComponentUpdate使用场景
```js
    // 避免一个组件无效渲染
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.content !== this.props.content){
            return true;
        }else{
            return false;
        }
    }
```

#### CompoentDidMount函数发送ajax
react使用axios配合Charles进行本地mock数据模拟
```js
componentDidMount(){
        axios.get('/api/my-app')
            .then((res)=>{
                console.log(res.data);
                this.setState(() => ({
                    list: [...res.data]
                }))
            })
            .catch(()=>{alert('error')})
    }
```

**发送ajax时候遇到的问题**

首次使用Charles对http抓包会出现错误，记得在谷歌浏览器安装插件Proxy SwitchyOmega。再对Charles进行配置。以及借用github上破解charles，地址https://github.com/hzy1257664828/Charles-Crack


## React动画
```js
import './style.css'
class App extens Component {
  constructor(props){
    super(props);
    this.state = {
      show: true
    }
    this.handleToggole = this.handleToggole.bind(this)
  }

  render() {
    return(
      <Fragment>
            <div className={this.state.show ? 'show' : 'hide'}>hello</div>
            <button onClick={this.handleToggole}>toggole</button>
      </Fragment>
    )
  }

  handleToggole(){
    this.setState({
      show:this.state.show ? false : true;
    })
  }
}
```

```css
.show{
  opacity:1;
  transition: all 1s ease-in;
}

hide{
  opacity:0;
  transition: all 1s ease-in;
}
```

### react过渡动画
**@keyframes**
```css
/*过渡动画*/
.hide{
  animation: hide-item 2s ease-in forwards;
}


@keyframes hide-item{
  0% {
    opacity: 1;
    color: red
  }
  50% {
    opacity: 0.5;
    color: green;
  }
  100% {
    opacity: 0;
    color: blue;
  }
}
```


### 使用组件react-transition-group
```js
import { CSSTransition } from 'react-transition-group';

// CSSTransition
<CSSTransition
    timeout={1000} //动画执行1秒
    classNames='fade' //自定义的class名
    unMountOnExit //可选，当动画出场后在页面上移除包裹的dom节点
    onEntered={(el) => {
    el.style.color = 'blue'
    }} // 当入场动画执行结束以后
    appear = {true}
>
<div>{item}</div>
</CSSTransition>


// TransitionGroup
render() {
    return(
      <Fragment>
           <TransitionGroup>
           {
              this.state.list.map((item,index) => {
                return (
                    <CSSTransition
                      in={this.state.show} // 感知变化
                      timeout={1000} //动画执行1秒
                      classNames='fade' //自定义的class名
                      unMountOnExit //可选，当动画出场后在页面上移除包裹的dom节点
                      onEntered={(el) => {
                        el.style.color = 'blue'
                      }} // 当入场动画执行结束以后
                      appear = {true} //第一次渲染就有动画
                      key={index}
                  >
                  <div>{item}</div>
                  </CSSTransition>
                )
              })
            }
           </TransitionGroup>
            <button onClick={this.handelAddItem}>toggole</button>
      </Fragment>
    )
}
```


```css
/* 入场动画刚要执行还没执行的一个瞬间 */

.fade-enter,.fade-appear{
  opacity:0;
}

/* 入场动画执行的第二个时刻到入场动画执行完成 */
.fade-enter-active,.fade-appear-active{
  opacity:1;
  transition:opacity 1s ease-in;
}


/* 当整个入场动画执行完成以后 */
.fade-enter-done,.fade-appear-done{
  opacity:1;
}

/* 出场动画执行的第一个时刻 */
.fade-exit{
  opacity:1;
}

/* 出场动画执行的第二个时候到出场完成 */
.fade-exit-active{
  opacity:0;
  transition:opacity 1s ease-in;
}

/* 整个出场动画执行完成之后 */
.fade-exit-done{
  opacity:;
}
```

多个元素加动画，外层用<TransitionGroup>包裹。详情可见github,[transitionGroup](https://github.com/reactjs/react-transition-group)



## Redux
Reducer + Flur,将数据放到公用的store，更新在store，取也在store。

![20200713172423](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200713172423.png)

### 创建store
```js
// index.js
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer);

export default store;

// reducer
const defaultState = {
  inputValue: '123',****
  list: [1,2]
}

export default (state = defaultState,action) => {
  return state;
}
```

### Redux流程
![20200715202851](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200715202851.png)


1. 创建store，注意：定义默认的reducer传入，再创建store。
2. reducer必须返回函数，将返回函数第一个参数设置成state = defaultState，第二个参数为action
3. 绑定我们要操作的事件，记得绑定this指向，在方法中定义aciton。并且派发给state。state自动将接受的action和state都传给reducer
4. 我们在reducer中深拷贝一次state，接着修改newState修改内容，返回newState
5. 使用subscribe来订阅store。用getState重新从store中获取新的数据，可以设置方法对新数据的操作了。

**注意**
- Redux中不可以有非纯函数。日期函数，ajax函数，setimeout都不是纯函数。
纯函数指的是，给固定的输入，就布丁能给出固定的输出，并且不会有任何副作用。

### antDesign
[antDesgin官网](https://ant.design/components/overview-cn/)

更漂亮的第三方组件，实现组件的更漂亮。
```
yarn add antd
```
For example:
```js
import { Input } from 'antd';

ReactDOM.render(<Input placeholder="Basic usage" />, mountNode);
```


### actionType拆分
```js
// actionType
export const CHANG_INPUT_VALUE = 'change_input_value';
export const ADD_TODO_ITEM = 'add_todo_item';
export const DELETE_TODO_ITEM = 'delete_todo_item';


import { CHANG_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM } from './actionTypes'
import store from '.';


// TodoList
handleInputChange(e) {
  const action = {
    type: CHANG_INPUT_VALUE
    value: e.target.value
  }
  store.dispatch(action); // 派发出去
}

// reducer
import { CHANG_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM } from './actionTypes'

// reducer 可以接收state，但是绝不能修改state
export default (state = defaultState,action) => {
  if(action.type === CHANG_INPUT_VALUE){
    const newState = JSON.parse(JSON.stringify(state)); // 深拷贝一份state
    newState.inputValue = action.value;
    return newState;
  }
}
```

### actionCreator来统一构建action
让action在一个单独的js文件中创建，这写函数帮我们创建某个type的值。
```js
import { CHANG_INPUT_VALUE } from './actionTypes'

// actionsCreators
export const getInputChangeAction = (value) => ({
  type: CHANG_INPUT_VALUE,
  value
})

// TodoList
import { getInputChangeAction, } from './actionCreators'
// import { CHANG_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM } from './actionTypes'
import store from '.';

handleInputChange(e) {
  // 修改前
  // const action = {
  //   type: CHANG_INPUT_VALUE
  //   value: e.target.value
  // }
  // store.dispatch(action); // 派发出去

  // 修改后
  const action = getInputChangeAction(e.target.value);
  store.dispatch(action);
}
```


## Redux进阶

### 分离组件
- UI组件-只作渲染
- 容器组件-逻辑

将render的页面要渲染的内容都写到UI组件内，通过父组件向子组件的UI组件传值，然后将父组件引入UI组件即可。这个时候子组件就成为UI组件-渲染，父组件成为容器组件-逻辑。

### ajax
```js
// todoList
import axios from 'axios';
import { INIT_LIST_ACTION } from './actionTypes';
import { initListAction } from './actionCreators';

componentDidMount () {
    axios.get('./list.json').then((res) => {
      const data = res.data;
      const action = initListAction(data);
      store.dispactch(action);
    })
}

// actionCreators
import { INIT_LIST_ACTION } from './actionTypes';

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

// actionTypes
export const INIT_LIST_ACTION = 'init-list-action'


// reducer
if(action-type === INIT_LIST_ACTION) {
  const newState = JSON.parse(JSON.stingify(state));
  newState.list = action.data;
  rentun newState;
}
```


### Redux-thunk中间件实现ajax（更优）
[Redux-thunk](https://github.com/reduxjs/redux-thunk)
[redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)

```
yarn add redux-thunk
```

![20200716060106](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200716060106.png)


<font color="red">最容易理解的redux-thunk方式</font>
下面我用一段简短的代码来理解下什么redux-thunk
```js
  if(action === object){
    dispatch(action);   // 如果是action是对象，则直接派发给store
  } else if (action === function) {
    const action = function();
    sotre.dispatch(action);  // 如果action是函数，先执行函数，再dispatch
  }
```


下方代码在todoList中的实现
```js
// index.js
import { applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddle(thunk);
);

const store = createStore(reducer, enhancer);

// todoList
import { getTodoList } from './actionCreators';

conpoentDidMount(){
  const action = getTodoList();
  store.dispatch(action);
}

// actionCreators 
// 使用了Redux-thunk以后可以return一个函数了
import axios from 'axios'

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

export const getTodoList = () => {
  return () => {
    axios.get('./list.json/').then(('res') => {
      const data = res.data;
      const action = initListAction(data);
      dispatch(action);
    })
  }
}

// reducer
if(action.type === INIT_LIST_ACTION) {
  const newState = JSON.parse(JSON.stingify(state));
  newState.list = action.data;
  rentun newState;
}
```


### Redux-saga
[Redux-saga](https://github.com/redux-saga/redux-saga)
```js
yarn add redux-saga
```
**Redux-saga: 类似于Redux-thunk，不过redux-saga将异步请求直接抽象成一个单独的组件。而Redux-thunk只是单纯的判断是函数或者对象来进行不同的操作。**

Redux-saga正确使用
```js
// index
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todoSaga from './sagas';
// todoSaga 引入的就是sagas中的generator函数
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware(); // 创建中间件
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(mySaga)

// sagas
import { takeEvery,put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes';
import { initListAction } from './actionCreators';
import axios from 'axios';

function* getInitList() {
  try{
    const res = yield axios.get('/list.json');
    const action = initListAction(res.data);
    yield put(action);
  } catch(e){
    console.log('list.json网络请求失败');
  }
}

function* mySaga() {
  // generator函数
  yield takeEvery("GET_INIT_LIST", fetchUser);  // 只要接收GET_INIT_LIST，就会执行fetchUser
}
export default mySaga;

// TodoList
import { getInitList } from './actionCreator.js'

componentDidMount() {
  const action = getInitList();
  store.dispatch(action);
}

// actionCreators
import { GET_INIT_LIST } from './actionTypes.js'

export const getInitList = () => {
  type: GET_INIT_LIST;
}

// actionTypes
export const GET_INIT_LIST = 'get_init_list';

// reducer
if(action.type === INIT_LIST_ACTION) {
  const newState = JSON.parse(JSON.stingify(state));
  newState.list = action.data;
  rentun newState;
}
```

### React-Redux
[react-redux](https://github.com/reduxjs/react-redux)
```
yarn add react-redux
```

```js
// index
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer);

export default store;


// actiontypes
export const CHANG_INPUT_VALUE = 'change_input_value';
export const ADD_TODO_ITEM = 'add_todo_item';
export const DELETE_TODO_ITEM = 'delete_todo_item';


// reducer
const defaultState = {
  inputValue: '',
  list: []
}

export default (state = defaultState,action) => {
  if(action.type === 'change_input_value'){
    const newState = JSON.parse(JSON.stringify(state)); // 深拷贝state  
    newState.inputValue = action.value;
    return newState;
  }

  if(action.type === 'add_item'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }

  if(action.type === 'delete_item'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index,1);
    return newState;
  }
  return state;
}


export default (state = defaultState,action) => {
  return state;
}


// todoList
import React, {} from 'react';
import { connect } from 'react-redux'

const TodoList = (props) => {
  const { inputValue,changeInputValue,handleClick,handleDelete,list } = props;
  return(
    <div> 
      <div>
        <input value={inputValue} onChange={changeInputValue}/>
        <button onClick={handleClick}>提交</button>
      </div>
        <ul>
        {
          list.map((item,index) => {
            return <li onClick={handleDelete} key={index}>{item}</li>
          })
        }
        </ul>
    </div>
  )
}


// 2.store中的数据映射到组件的props的inputValue上面
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}


// 3.将store.dispatch挂载到props上
const mapDispatchToprops = (dispatch) => {
  return {
    changeInputValue(e){
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action); // action发给store
    },
    handleClick(){
      const action = {
        type: 'add_item'
      }
      dispatch(action); // 将action发给store
    },
    handleDelete(index){
      const action = {
        type: 'delete_item',
        index
      }
      dispatch(action);
    }
  }
}

// 1.connect方法让TodoList与store做连接，规则为mapStateToProps，
// mapStateToProps中是store和组件的关系罗列清楚
// 组件props如何对store做修改和store.dispatch做关联用mapDispatchToprops。
export default connect(mapStateToProps,mapDispatchToprops)(TodoList);




// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList.js';
import { Provider } from 'react-redux'
import store from './store'


const App = (
    // Provider 将 store提供给了他内部的所有组件
    <Provider store={store}>
        <TodoList />
    </Provider>
)

ReactDOM.render(App,document.getElementById('root'));
```



## React代码性能优化
1. construtor
2. 内置setState
3. key值
4. 生命周期shouldComponentUpdate


