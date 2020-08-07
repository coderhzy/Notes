const obj1 = {
  age: 20,
  name: 'xxx',
  address: {
    city: 'beijing'
  },
}

const obj2 = deepClone(obj1);
obj2.address.city = 'shanghai';
console.log(obj1.address.city);
console.log(obj2.address.city);

function deepClone (obj) {
  if (typeof obj !== 'object' || obj == null) {
    // obj是null,或者不是对象和数组，直接返回
    return obj;
  }

  // 初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 保证 Key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      //递归调用
      result[key] = deepClone(obj[key]);
    }
  }

  // 返回结果
  return result;
}