// const pro = new Promise((resolve, reject) => {
//   console.log("未决阶段");
//   setTimeout(() => {
//     resolve(123);
//   }, 3000)
// });

// pro.then(data => {
//   // pro状态是pending
//   console.log(data);
// });


// const pro = new Promise((resolove, reject) => {
//   console.log("未决阶段");
//   setTimeout(() => {
//     if (Math.random < 0.5) {
//       resolove(123);
//     } else {
//       reject(new Error('错误'));
//     }
//   }, 3000)
// })

// pro.then(data => {
//   console.log(data);
// }), err => {
//   console.log(err);
// }


// 将Promise封装到函数中
function biaobai (god) {
  return new Promise((resolve, reject) => {
    console.log(`给${god}发出信息`);
    setTimeout(() => {
      if (Math.random() < 0.5) {
        // 女神同意
        resolve(true);
      } else {
        // resolve
        resolve(false);
      }
    }, 3000)
  })
}

const pro = biaobai("女神1");
pro.then(result => {
  console.log(result);
})