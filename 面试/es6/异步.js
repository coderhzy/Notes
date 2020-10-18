// 失败处理，这种异步已经不可取
// function double (value, success, failure) {
//   setTimeout(() => {
//     try {
//       if (typeof value !== 'number') {
//         throw 'Must provide number as first argument'
//       }
//       success(2 * value);
//     } catch (e) {
//       failure(e);
//     }
//   }, 1000)
// }

// const successCallback = (x) => console.log(`Success: ${x}`);
// const failureCallback = (e) => console.log(`Failure: ${e}`);

// console.log(double(3, successCallback, failureCallback));
// console.log(double('b', successCallback, failureCallback));

// 期约
// let p1 = new Promise((resolve, reject) => {
//   resolve();
// })

// setTimeout(console.log, 0, p1);


// let p2 = new Promise((resolve, reject) => {
//   reject();
// })

// setTimeout(console.log, 0, p2);

// new Promise(() => setTimeout(console.log, 0, 'executor'));
// setTimeout(console.log, 0, 'promise initialized')


// let p = new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000);
// })
// setTimeout(console.log, 0, p);
// Promise { <pending> }


// 状态不可被改变
// let p = new Promise((resolve, reject) => {
//   resolve();
//   reject();
// })

// setTimeout(console.log, 0, p);

// 为了保证，设置十秒退出
// let p = new Promise((resolve, reject) => {
//   setTimeout(reject, 10000); // 10秒后调用reject
// })

// setTimeout(console.log, 0, p); // Promise <pending>
// setTimeout(console.log, 11000, p); // 11秒后再检查



// let p1 = new Promise((resolve, reject) => {
//   resolve();
// })

// let p2 = Promise.resolve();

// let p = Promise.resolve(7);

// setTimeout(console.log, 0, p == Promise.resolve(p));

// setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p)));


// function onResolved (id) {
//   setTimeout(console.log, 0, id, 'resolved');
// }


// function onRejected (id) {
//   setTimeout(console.log, 0, id, 'rejected');
// }

// let p1 = new Promise((resolve, reject) => { setTimeout(resolve, 3000) });
// let p1 = new Promise((resolve, reject) => { setTimeout(reject, 3000) });


// finally
// let p1 = Promise.resolve('foo');
// let p2 = p1.finally(() => {
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('bar');
//     }, 1000)
//   })
// })

// setTimeout(console.log, 0, p2);

// setTimeout(() => {
//   setTimeout(console.log, 0, p2), 200
// })


// let p1 = Promise.resolve();
// p1.then(() => {
//   console.log('p1.then onResolved');
// })
// console.log('p1.then return()'); // 同步代码先执行


// let p1 = new Promise((resolve, reject) => {
//   resolve('foo');
// })
// p1.then((value) => {
//   console.log(value);
// })


// Promise.reject(new Error('foo'));
// console.log('bar');


// 捕获错误
// 同步捕获错误
// console.log('hello');
// try {
//   throw Error('foo');
// } catch (e) {
//   console.log('caught error', e);
// }
// console.log('end');


// // 异步捕获错误
// new Promise((resolve, reject) => {
//   console.log('hello');
//   reject(Error('bar'));
// }).catch((e) => {
//   console.log('caught error', e);
// }).then(() => {
//   console.log('end');
// })



// let p = new Promise((resolve, reject) => {
//   console.log('first');
//   resolve();
// })

// p.then(() => console.log('second'))
//   .then(() => console.log('third'))
//   .then(() => console.log('fourth'))


// let p = new Promise((resolve, reject) => {
//   console.log('first');
//   resolve();
// })

// p.then(() => console.log('second'))


// 异步期约
// let p1 = new Promise((resolve, reject) => {
//   console.log('hello1');
//   setTimeout(resolve, 1000);
// })

// p1.then(() => new Promise((resolve, reject) => {
//   console.log('hello2');
//   setTimeout(resolve, 1000);
// }))
//   .then(() => new Promise((resolve, reject) => {
//     console.log('hello3');
//     setTimeout(resolve, 1000);
//   }))
//   .then(() => new Promise((resolve, reject) => {
//     console.log('hello4');
//     setTimeout(resolve, 1000);
//   }))

// async function foo () {
//   console.log(1);
//   return 3;
// }

// foo().then(console.log);
// console.log(2);

