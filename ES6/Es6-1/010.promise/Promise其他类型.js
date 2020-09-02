// 等效于
// const pro = new Promise((resolve, reject) => {
//   resolve(1);
// });

// console.log(pro);

// const pro1 = Promise.resolve(1);
// console.log(pro1);


// 等效于
// const pro = new Promise((resolve, reject) => {
//   reject(1);
// })
// console.log(pro);

// const pro1 = Promise.reject(1);
// console.log(pro1);



// 构造函数传入一个promise对象 也是成立
const p = new Promise((resolve, reject) => {
  resolve(3);
})

// const pro = Promise.resolve(p);
// 等效于
const pro = p;

console.log(pro === p);