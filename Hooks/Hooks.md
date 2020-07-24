[toc]
## Hooks
### eject解构
修改package.json，增加config/和scripts/目录。释放script.js。

## react新特性
### Context
Context提供一种方法，能够让数据在组件树中传递而不必一级一级手动传递。
API:createContext(defaultValue?)
```js
import React, { Component,createContext } from 'react';
import logo from './logo.svg';
import './App.css';

const BatteryContext = createContext();

// 跨层级访问
class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {
          battery => <h1>Battery: {battery}</h1>
        }
      </BatteryContext.Consumer>
    )
  }
}

class Middle extends Component {
  render() {
    return <Leaf />
  }
}

function App() {
  return (
    <BatteryContext.Provider value={60}>
      <Middle />
    </BatteryContext.Provider>
  );
}

export default App;

```


## 什么是React Hooks？
- Hook是React16.8新特性。它可以让你不编写class的情况下使用state以及其他的React特性。
- 在编写函数组件要添加state，以往做法是转换成class。现在直接在现有的函数组件中使用Hook。

## Hooks解决了什么问题？
- 在组件之间复用状态逻辑很难，可以要用到render props和高阶组件。
- React需要为共享状态逻辑提供更好的原生途径，Hook使得你在无需修改组件结构的复杂下复用状态逻辑。
- 复杂组件变得很难理解，Hook将组件中相互关联的部分拆分成更小的函数。（比如设置订阅或请求数据）。
- 难以理解的class，不好琢磨的this

## Hooks的使用注意事项
- 只能在函数最外层调用Hokk。不要在循环、条件判断或者子函数中调用。
- 只能在React的**函数组件**中调用Hook。不要在其他JavaScript函数中调用。

## useState
- useState是一个Hook
- 通过在函数组件里调用它来添加一部分内部state，React会在重复渲染时保留这个state。
- useState会返回一对值： 当前状态和一个让你更新它的函数，你可以在事件处理函数中或者其他一些地方来调用这个函数。它类似class组件的this.setState，但是useState**不会**将新的state和旧的state来合并。
- useState唯一的参数就是state
- 返回一个state，以及更新state的函数
 -- 1. 在初始渲染期间，返回的状态（state）与传入的第一个参数（initialState）值相同。
 -- 2. setState函数用于更新state。他接收一个新的state值并将组件的一次重新渲染加入队列。
 ```js
 const [state,setState] = useState(initialState);
 ```

### 计数器

```js
import React,{ useHooks, useState} from 'react';
import ReactDOM from 'react-dom';


// class Counter1 extends React.Component {
//   state = { number: 0 }
//   render () {
//     return(
//       <div>
//         <p>{this.state.number}</p>
//         <button onClick={() => this.setState({ number: this.state.number + 1} )}>+</button>
//       </div>
//     )
//   }
// }

function Counter2() {
  let [state,setState] = useState({ number:0 });
  return(
    <div>
    <p>{state.number}</p>
    <button onClick={() => setState({ number: state.number + 1 })}>+</button>  
  </div>
  )
}

ReactDOM.render(
    <Counter2 />,
  document.getElementById('root')
);
```

### 每次渲染都是独立的闭包
- 每一次渲染都有他自己的 Props and State
- 每一次渲染都有它自己的事件处理函数
- alert会**捕获**我点击按钮时候的状态。
- 我们组件函数每次渲染都会被调用，但是每一次调用中number值都是常量，并且它被赋予了当前渲染中状态值。
- 在单次渲染的范围内，props和state始终保持不变。
```js
function Counter2() {
  let [state,setState] = useState({ number:0 });
  const alertNumber = () => {
    setTimeout(() => {
      alert(state.number);
    },3000)
  }
  return(
    <div>
    <p>{state.number}</p>
    <button onClick={() => setState({ number: state.number + 1 })}>+</button>  
    <button onClick={alertNumber}>alertNumber</button>  
  </div>
  )
}
```
### 函数式更新
- 如果新的state需要使用先前的state来计算得出的话，那么可以将函数传递给setState。该函数将接收到的先前的state，并返回一个更新后的值。
```js
// 函数式更新
// 如果新的状态需要使用先前的状态计算出来
function Counter3() {
  let [state,setState] = useState({ number:0 });
  const lazy = () => {
    setTimeout(() => {
      setState({ number: state.number + 1 })
    },2000)
  }
  // 函数式更新
  function lazyFunction(){
    setTimeout(() => {
      setState(state => ({ number: state.number + 1 }));
    },3000)
  }

  return(
    <div>
    <p>{state.number}</p>
    <button onClick={() => setState({ number: state.number + 1 })}>+</button>  
    <button onClick={lazy}>lazy</button>  
    <button onClick={lazyFunction}>lazyFunction</button>  
  </div>
  )
}
```


### 惰性初始state
- initialState参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
- 如果初始state需要通过复杂计算获得，则传入一个函数，在函数中计算并返回初始的state，此函数只在初始化渲染时候被调用。
- 与class组件中的setState方法不同，useState不会自动合并更新对象。你可以用函数式的setState结合展开运算符来达到合并更新对象的效果。

```js
// 惰性初始state
function Counter4() {
  let [state,setState] = useState(function(){
    console.log('初始状态');
    return { number:0,name:'计数器' };
  })

  return(
    <div>
    <p>{state.name}:{state.number}</p>
    <button onClick={() => setState({ ...state, number: state.number + 1 })}>+</button>
  </div>
  )
}
```

### 性能优化
#### Object.is
- 调用State Hook的更新函数并传入当前的state时，React将跳过子组件的渲染及effect的执行。（React使用Oject.is比较算法，来比较state）
```js
// 性能优化
function Counter5() {
  let [state,setState] = useState(function(){
    return { number:0,name:'计数器' };
  })
  console.log('Counter5 render')

  return(
    <div>
    <p>{state.name}:{state.number}</p>
    <button onClick={() => setState({ ...state, number: state.number + 1 })}>+</button>
    <button onClick={() => setState(state)}>+</button>
  </div>
  )
}
```
#### 减少渲染次数
- 把内联回调以及依赖项作为参数传入 useCallback ，它将会返回该回调函数的memoized版本，该回调函数仅在某个依赖改变时才会更新
- 把创建函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才会重新计算memoized值。这种优化有助于避免在每次渲染时候都进行额外的开销计算。
```js
//  性能优化 useCallback
function Counter6() {
  let [number,setNumber] = useState(0);
  let [name,setName] = useState('hello');
  // 会在每次渲染的时候都会生成一个新的函数
  // 使用useCallback,只有在依赖变量发生变化才会重新生成
  const addClick = useCallback(() => setNumber(number + 1),[number]);
  const changeName = useCallback(() => setName(Date.now()),[name]);

  return(
    <div>
    <p>{name}:{number}</p>
    <button onClick={addClick}>addClick</button>
    <button onClick={changeName}>changeName</button>
  </div>
  )
}
```

#### userMemo
```js
import React,{ useHooks, useState, lazy, useCallback,memo, useMemo} from 'react';
import ReactDOM from 'react-dom';

function Child(props) {
  console.log('render child ');
  return (
    <button onClick={props.addClick}>{props.data.number}</button>
  )
}


// 就让函数组件拥有了记忆的功能,只有当组件当属性发生变更时候才会刷新，否则不刷新。
Child = memo(Child);

function App() {
  let [number,setNumber] = useState(0);
  let [name,setName] = useState('hello');
  // 第一个参数deps，表示此函数缓存依赖的变量，如果变量变量，会生成函数
  const addClick = useCallback(() => setNumber(x => x +1),[number]);
  const data = useMemo(()=> ({ number }),[ number ]);
  return (
    <div>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
      <Child addClick={addClick} data={data} />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```


#### 注意事项：为什么不让在if语句用hooks
- hooks是一一对比,只能在函数最外层调用Hook。**不要在循环、条件判断或者子函数中调用。**
```js
import React,{ useHooks, useState, lazy, useCallback,memo, useMemo, useEffect} from 'react';
import ReactDOM from 'react-dom';

function App(){
  let[number,setNumber] = useState(0);
  let[visible,setVisible] = useState(true);

  // 此处报错，Hook不可以用在if中
  if(number % 2 == 1){
    useEffect(() => {

    })
  }

  return(
    <div>
      <p>{number}</p>
      {visible && <div>visible</div> }
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```
TODO:画图解释为什么不可以用原理

## useReducer
- useState的替代方案。它接收一个形如(state,action) => newState的reducer,并返回当前的state以及其配套的dispatch方法。
- 在某些场景下，useRducer会比useState更加适用。例如state逻辑复杂且包含多个子值，或者下一个state依赖于之前的state等。

```js
const [state,dispatch] = useReducer(reducer,initialArg,init);
```

```js
import React,{ useHooks, useState, lazy, useCallback,memo, useMemo, useEffect,useReducer} from 'react';
import ReactDOM from 'react-dom';

let initialState = { number:0 }
const INCREMENT = 'INCREMENT';
const DECREAENT = 'DECREAENT';
function reducer(state,action){
  switch(action.type){
    case INCREMENT : 
          return { number:state.number + 1};
    case DECREAENT :
          return { number:state.number - 1 }
          default:
            return state
  }
}

function App(){
  let [state,dispatch] = useReducer(reducer,initialState)

  return(
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type:INCREMENT})}>+</button>
      <button onClick={() => dispatch({ type:DECREAENT})}>-</button>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```


#### 补充： 自定义hooks
```js
// 自定义hooks
// reducer->reducer->dispatch({ payload }) -> action.payload -> reducer
function useState(initialState){

  const reducer = useCallback((state,action) => action.payload);
  let [state,dispatch] = useReducer(reducer,initialState);
  function setState(payload){
    dispatch({ payload })
  }
  return [state,setState];
}
```

## useContext
- 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
- 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定
- 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值
- useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>
- useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context

```js
import React,{ useHooks, lazy, useCallback,memo, useMemo, useEffect,useReducer, useState, useContext} from 'react';
import ReactDOM from 'react-dom';

let MyContext = React.createContext();
function Counter(){
  // 解构value
  let { state,setState } = useContext(MyContext);
  return(
    <div>
      <p>{state.number}</p>
      <button onClick={ () => setState({ number: state.number + 1 })}>+</button>
      <button onClick={ () => setState({ number: state.number - 1 })}>-</button>
    </div>
  )
}

function App(){
  const [state,setState] = useState({ number: 0 });
  return(
    <MyContext.Provider value={{ state,setState }}>
      <Counter />
    </MyContext.Provider>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
```

## useEffect

- 在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性
- useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API

```js
useEffect(didUpdate);
```

```js
import React, {useEffect,Component, useState } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  let[state,setState] = useState( { number: 0 } );
  // useEffect里的函数会在组件挂载完成以后或者组件更新完成以后进行调用
  // 如果没有给第二个参数，那么函数会在执行渲染后调用


  // Can't perform a React state update on an unmounted component. 
  // This is a no-op, but it indicates a memory leak in your application. 
  // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  useEffect(() => {
    console.log('开启一个定时器')
    let timer = setInterval(() => {
      setState(x => ({ number: x.number + 1 }))
    }, 1000);
    // useEffect会返回一个清理函数，当组件需要卸载当时候 来执行清理函数
    return() => {
      console.log('销毁一个定时器')
      clearInterval(timer);
    }
  },[]);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => setState({ number:state.number + 1} )}>+</button>
    </div>
  )
}

function App(){
  let [visible,setVisible] = useState(true);
  return(
    <div>
      <button onClick={ () => setVisible(false) }>hide</button>
      {visible && <Counter />}
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```

#### useRef
- useRef返回一个可变的ref对象，其.current属性被初始化为传入的参数.(initialValue)
- 返回的ref对象在组件的整个生命周期内保持不变。

```js
const refContainer = useRef(initialValue);
```


**不推荐createRef，推荐useRef**
```js
import React,{ useEffect,useState, useRef} from 'react';
import ReactDOM from 'react-dom';

// useRef React.createRef
let lastRef;
function Child(){
  //let refObject = React.createRef(); // refObject={current:要引用的组件}
  // console.log('lastRef === refObject',lastRef === refObject); // false
  let refObject = useRef();
  console.log('lastRef === refObject',lastRef === refObject);  // true
  lastRef = refObject;
  function getFocus(){
    refObject.current.focus();
  }

  return(
    <div>
      <input ref={refObject}></input>
      <button onClick={getFocus}>获得焦点</button>
    </div>
  )
}


function Parent(){
  let [number,setNumber] = useState(0);
  return(
    <div>
      <Child />
      <button onClick={() => setNumber(x => x + 1)}>+</button>
    </div>
  )
}

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);

```

**自实现useRef底层**
```js
//  自实现useRef底层
function useRef(){
  if(!currentRefObject){
    currentRefObject = {current:null};
  }else{
    return currentRefObject;
  }
}
```


### 小段总结，要用use这一些的作用？
1. useMemo userCallback useRef。本质上都是为了缓存，这些东西在没有hooks之前。在以前为们都用类组件，累组件就有实例，类的实例 一旦创建就有实例，上面的属性也可以存在。但是现在我们hooks，hooks只能用在函数组件里。函数组件没有this，就没有实例，没有办法在实例上挂属性状态。
现在就要靠useMemo、useCallback、useRef来实现缓存。


#### forwardRef
- 将ref从父组件中转发到子组件中的dom元素上
- 子组件接受props和ref作为参数
  
```js
function Child(props,ref){
  return (
    <input type="text" ref={ref}/>
  )
}
Child = forwardRef(Child);
function Parent(){
  let [number,setNumber] = useState(0); 
  const inputRef = useRef();
  function getFocus(){
    inputRef.current.value = 'focus';
    inputRef.current.focus();
  }
  return (
      <>
        <Child ref={inputRef}/>
        <button onClick={()=>setNumber({number:number+1})}>+</button>
        <button onClick={getFocus}>获得焦点</button>
      </>
  )
}
```

#### useImperativeHandle
- useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
- 在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用

```js
useImperativeHandle(ref,() => ({}))
```

**实现封装**
```js
function Child(props,ref){
  const inputRef = useRef();
  useImperativeHandle(ref,()=>(
    {
      focus(){
        inputRef.current.focus();
      }
    }
  ));
  return (
    <input type="text" ref={inputRef}/>
  )
}
Child = forwardRef(Child);
function Parent(){
  let [number,setNumber] = useState(0); 
  const inputRef = useRef();
  function getFocus(){
    console.log(inputRef.current);
    inputRef.current.value = 'focus';
    inputRef.current.focus();
  }
  return (
      <>
        <Child ref={inputRef}/>
        <button onClick={()=>setNumber({number:number+1})}>+</button>
        <button onClick={getFocus}>获得焦点</button>
      </>
  )
}
```

#### useLayoutEffec
- 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect
- 可以使用它来读取 DOM 布局并同步触发重渲染
- 在浏览器执行绘制之前useLayoutEffect内部的更新计划将被同步刷新
- 尽可能使用标准的 useEffect 以避免阻塞视图更新

![20200720115157](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200720115157.png)


useLayoutEffec -> painting -> useEffect
```js
function LayoutEffect() {
    const [color, setColor] = useState('red');
    useLayoutEffect(() => {
        alert(color);
    });
    useEffect(() => {
        console.log('color', color);
    });
    return (
        <>
            <div id="myDiv" style={{ background: color }}>颜色</div>
            <button onClick={() => setColor('red')}>红</button>
            <button onClick={() => setColor('yellow')}>黄</button>
            <button onClick={() => setColor('blue')}>蓝</button>
        </>
    );
}
```

## 自定义hooks
- 有时候我们会想要在组件之间重用一些状态逻辑
- 自定义 Hook 可以让你在不增加组件的情况下达到同样的目的
- Hook 是一种复用状态逻辑的方式，它不复用 state 本身
- 事实上 Hook 的每次调用都有一个完全独立的 state
- 自定义 Hook 更像是一种约定，而不是一种功能。如果函数的名字以 use 开头，并且调用了其他的 Hook，则就称其为一个自定义 Hook

```js
function useNumber(){
  const [number,setNumber] = useState(0);
  useEffect(() => {
     console.log('开启一个新的定时器')
     const $timer = setInterval(()=>{
      setNumber(number+1);
     },1000);
     return ()=>{
      console.log('销毁老的定时器')
         clearInterval($timer);
     }
  });
  return number;
}
function Counter1(){
  let number1 = useNumber();
  return (
      <>
          <p>{number1}</p>
      </>
  )
}
function Counter2(){
  let number = useNumber();
  return (
      <>
          <p>{number}</p>
      </>
  )
}
function App(){
  return <><Counter1/><Counter2/></>
}
```