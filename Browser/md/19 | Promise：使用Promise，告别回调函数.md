# 19 | Promise：使用Promise，告别回调函数

Promise是解决异步编码风格的问题。

## 异步编程的问题：代码逻辑不连续
下载网络文件任务、获取摄像头等设备信息任务，这些任务都会放到页面主线程之外的进程或者线程中去执行，这样就避免了耗时任务“霸占”页面主线程的情况。
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/06/03/15911422247534.jpg)
<center>Web 应用的异步编程模型</center>

上图页面**主线程发起一个耗时任务**，这个时候页面主线程回继续执行消息队列的任务。等到进程处理这个任务后，这个任务回被添加到渲染进程的消息队列中，并排队等待循环系统的处理。派对结束后，**循环系统**取出消息队列中的任务来处理，接着出发回调的操作。这个页面的编程就是：**异步回调**

### Web 页面的单线程架构决定了异步回调，而异步回调影响到了我们的编码方式，到底是如何影响的呢？

假设有一个下载的需求，使用 XMLHttpRequest 来实现，具体的实现方式你可以参考下面这段代码：
```
// 执行状态
function onResolve(response){console.log(response) }
function onReject(error){console.log(error) }
 
let xhr = new XMLHttpRequest()
xhr.ontimeout = function(e) { onReject(e)}
xhr.onerror = function(e) { onReject(e) }
xhr.onreadystatechange = function () { onResolve(xhr.response) }
 
// 设置请求类型，请求 URL，是否同步信息
let URL = 'https://time.geekbang.com'
xhr.open('Get', URL, true);
 
// 设置参数
xhr.timeout = 3000 // 设置 xhr 请求的超时时间
xhr.responseType = "text" // 设置响应返回的数据格式
xhr.setRequestHeader("X_TEST","time.geekbang")
 
// 发出请求
xhr.send();
```
一段代码出现了5次回调。
***
### 封装异步代码，让处理流程变得线性
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/06/03/15911445169150.jpg)
<center>封装请求过程</center>
我们将 XMLHttpRequest 请求过程的代码封装起来了，重点关注输入数据和输出结果。

**封装的request**
```
//makeRequest 用来构造 request 对象
function makeRequest(request_url) {
    let request = {
        method: 'Get',
        url: request_url,
        headers: '',
        body: '',
        credentials: false,
        sync: true,
        responseType: 'text',
        referrer: ''
    }
    return request
}
```

**封装请求过程**
```
//[in] request，请求信息，请求头，延时值，返回类型等
//[out] resolve, 执行成功，回调该函数
//[out] reject  执行失败，回调该函数
function XFetch(request, resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.ontimeout = function (e) { reject(e) }
    xhr.onerror = function (e) { reject(e) }
    xhr.onreadystatechange = function () {
        if (xhr.status = 200)
            resolve(xhr.response)
    }
    xhr.open(request.method, URL, request.sync);
    xhr.timeout = request.timeout;
    xhr.responseType = request.responseType;
    // 补充其他请求信息
    //...
    xhr.send();
}
```

 XFetch 函数需要一个 request 作为输入，然后还需要两个回调函数 resolve 和 reject，当请求成功时回调 resolve 函数，当请求出现问题时回调 reject 函数。
 
 **具体的实现方式如下所示：**
 ```
XFetch(makeRequest('https://time.geekbang.org'),
    function resolve(data) {
        console.log(data)
    }, function reject(e) {
        console.log(e)
    })
 ```
 
## 新的问题：回调地狱
复杂点的项目时,回调地狱。

参考下面这段让人凌乱的代码：
```
XFetch(makeRequest('https://time.geekbang.org/?category'),
      function resolve(response) {
          console.log(response)
          XFetch(makeRequest('https://time.geekbang.org/column'),
              function resolve(response) {
                  console.log(response)
                  XFetch(makeRequest('https://time.geekbang.org')
                      function resolve(response) {
                          console.log(response)
                      }, function reject(e) {
                          console.log(e)
                      })
              }, function reject(e) {
                  console.log(e)
              })
      }, function reject(e) {
          console.log(e)
      })
```

这段代码是先请求time.geekbang.org/?category，如果请求成功的话，那么再请求time.geekbang.org/column，如果再次请求成功的话，就继续请求time.geekbang.org。也就是说这段代码用了三层嵌套请求，就已经让代码变得混乱不堪，所以，我们还需要解决这种嵌套调用后混乱的代码结构。

**这段代码之所以看上去很乱，归结其原因有两点：**
- **第一是嵌套调用，**下面的任务依赖上个任务的请求结果，并在**上个任务的回调函数内部执行**新的业务逻辑，这样当嵌套层次多了之后，代码的可读性就变得非常差了。
- **第二是任务的不确定性，**执行每个任务都有两种可能的结果（成功或者失败），所以体现在代码中就需要对每个任务的执行结果做两次判断，这种对每个任务都要进行一次额外的错误处理的方式，明显增加了代码的混乱程度。

### Promise：消灭嵌套调用和多次错误处理
我们使用 Promise 来重构 XFetch 的代码，示例代码如下所示：
```
function XFetch(request) {
  function executor(resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', request.url, true)
      xhr.ontimeout = function (e) { reject(e) }
      xhr.onerror = function (e) { reject(e) }
      xhr.onreadystatechange = function () {
          if (this.readyState === 4) {
              if (this.status === 200) {
                  resolve(this.responseText, this)
              } else {
                  let error = {
                      code: this.status,
                      response: this.response
                  }
                  reject(error, this)
              }
          }
      }
      xhr.send()
  }
  return new Promise(executor)
}
```
利用 XFetch 来构造请求流程，代码如下：
```
var x1 = XFetch(makeRequest('https://time.geekbang.org/?category'))
var x2 = x1.then(value => {
    console.log(value)
    return XFetch(makeRequest('https://www.geekbang.org/column'))
})
var x3 = x2.then(value => {
    console.log(value)
    return XFetch(makeRequest('https://time.geekbang.org'))
})
x3.catch(error => {
    console.log(error)
})
```

- 首先我们引入了 Promise，在调用 XFetch 时，会返回一个 Promise 对象。
- 构建 Promise 对象时，需要传入一个executor 函数，XFetch 的主要业务流程都在 executor 函数中执行。
- 如果运行在 excutor 函数中的业务执行成功了，会调用 resolve 函数；如果执行失败了，则调用 reject 函数。
- 在 excutor 函数中调用 resolve 函数时，会触发 promise.then 设置的回调函数；而调用 reject 函数时，会触发 promise.catch 设置的回调函数。

**Promise消灭嵌套回调**。产生嵌套函数的一个主要原因就是在发起任务**请求时**回带上调用函数，这样当任务处理结束之后，下一个任务就只能在回调函数中处理了。

### Promise 主要通过下面两步解决嵌套回调问题的。
首先，Promise 实现了回调函数的延时绑定。回调函数的延时绑定在代码上体现就是先创建 Promise 对象 x1，通过 Promise 的构造函数 executor 来执行业务逻辑；创建好 Promise 对象 x1 之后，再使用 x1.then 来设置回调函数。示范代码如下：
```
// 创建 Promise 对象 x1，并在 executor 函数中执行业务逻辑
function executor(resolve, reject){
    resolve(100)
}
let x1 = new Promise(executor)
 
 
//x1 延迟绑定回调函数 onResolve
function onResolve(value){
    console.log(value)
}
x1.then(onResolve)
```
其次，需要将回调函数 onResolve 的返回值穿透到最外层。因为我们会根据 onResolve 函数的传入值来决定创建什么类型的 Promise 任务，创建好的 Promise 对象需要返回到最外层，这样就可以摆脱嵌套循环了。你可以先看下面的代码：
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/06/03/15911485596553.jpg)
<center>回调函数返回值穿透到最外层</center>

**Promise 通过回调函数延迟绑定和回调函数返回值穿透的技术，解决了循环嵌套**

### Promise 是怎么处理异常的
```
function executor(resolve, reject) {
    let rand = Math.random();
    console.log(1)
    console.log(rand)
    if (rand > 0.5)
        resolve()
    else
        reject()
}
var p0 = new Promise(executor);
 
var p1 = p0.then((value) => {
    console.log("succeed-1")
    return new Promise(executor)
})
 
var p3 = p1.then((value) => {
    console.log("succeed-2")
    return new Promise(executor)
})
 
var p4 = p3.then((value) => {
    console.log("succeed-3")
    return new Promise(executor)
})
 
p4.catch((error) => {
    console.log("error")
})
console.log(2)
```
因为Promise对象的错误具有“冒泡性”，会一直向后传递，直到被onReject函数处理或者被catch语句捕获为止。

### Promise 与微任务
用简单的 Promise 代码阐述两者关系：
```
function executor(resolve, reject) {
    resolve(100)
}
let demo = new Promise(executor)
 
function onResolve(value){
    console.log(value)
}
demo.then(onResolve)
```
- 首先执行 new Promise 时，Promise 的构造函数会被执行，不过由于 Promise 是 V8 引擎提供的，所以暂时看不到 Promise 构造函数的细节。
- 接下来，Promise 的构造函数会调用 Promise 的参数 executor 函数。然后在 executor 中执行了 resolve，resolve 函数也是在 V8 内部实现的，那么 resolve 函数到底做了什么呢？我们知道，执行 resolve 函数，会触发 demo.then 设置的回调函数 onResolve，所以可以推测，resolve 函数内部调用了通过 demo.then 设置的 onResolve 函数。
- 不过这里需要注意一下，由于 Promise 采用了回调函数延迟绑定技术，所以在执行 resolve 函数的时候，回调函数还没有绑定，那么只能推迟回调函数的执行。

这样按顺序陈述可能把你绕晕了，下面来模拟实现一个 Promise，我们会实现它的构造函数、resolve 方法以及 then 方法，以方便你能看清楚 Promise 的背后都发生了什么。这里我们就把这个对象称为 Bromise，下面就是 Bromise 的实现代码：
```
function Bromise(executor) {
    var onResolve_ = null
    var onReject_ = null
     // 模拟实现 resolve 和 then，暂不支持 rejcet
    this.then = function (onResolve, onReject) {
        onResolve_ = onResolve
    };
    function resolve(value) {
          //setTimeout(()=>{
            onResolve_(value)
           // },0)
    }
    executor(resolve, null);
}
```
观察上面这段代码，我们实现了自己的构造函数、resolve、then 方法。接下来我们使用 Bromise 来实现我们的业务代码，实现后的代码如下所示:
```
function executor(resolve, reject) {
    resolve(100)
}
// 将 Promise 改成我们自己的 Bromsie
let demo = new Bromise(executor)
 
function onResolve(value){
    console.log(value)
}
demo.then(onResolve)
```
执行这段代码，我们发现执行出错，输出的内容是：
```
Uncaught TypeError: onResolve_ is not a function
    at resolve (<anonymous>:10:13)
    at executor (<anonymous>:17:5)
    at new Bromise (<anonymous>:13:5)
    at <anonymous>:19:12
```
之所以出现这个错误，是由于 Bromise 的延迟绑定导致的，在调用到 onResolve_ 函数的时候，Bromise.then 还没有执行，所以执行上述代码的时候，当然会报“onResolve_ is not a function“的错误了。

也正是因为此，我们要改造 Bromise 中的 resolve 方法，让 resolve 延迟调用 onResolve_。

要让 resolve 中的 onResolve_ 函数延后执行，可以在 resolve 函数里面加上一个定时器，让其延时执行 onResolve_ 函数，你可以参考下面改造后的代码：
```
function resolve(value) {
          setTimeout(()=>{
              onResolve_(value)
            },0)
    }
```
上面采用了定时器来推迟 onResolve 的执行，不过使用定时器的效率并不是太高，好在我们有微任务，所以 Promise 又把这个定时器改造成了微任务了，这样既可以让 onResolve_ 延时被调用，又提升了代码的执行效率。这就是 Promise 中使用微任务的原由了。

<font color=red>总结</font>
- 多层嵌套的问题；
每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性。
Promise 通过回调函数延迟绑定、回调函数返回值穿透和错误“冒泡”技术解决了上面的两个问题。
- 最后，我们还分析了 Promise 之所以要使用微任务是由 Promise 回调函数延迟绑定技术导致的。

**思考一下**
1. Promise 中为什么要引入微任务？
2. Promise 中是如何实现回调函数返回值穿透的？
3. Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？