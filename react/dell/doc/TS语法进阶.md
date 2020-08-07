# TypeScript

## typeScript优点

1. 开发过程中，定义潜在的类型。
2. 更加友好的编辑器提示。
3. 定义变量更明确。

# TS中配置文件
```
tsc --init
```

只有运行tsc什么编译才走tsconfig.json文件。
```json
"include": ["./demo.ts"],  //指定编译哪个
"exclude": ["./demo.ts"],    // 指定不编译哪个
"files": ["./demo.ts"]  
```

**Compiler Options**
noImplicitAny: false 可以不显示配置any
strictNullChecks: false 不强制检查是null
outDir和rootDir： 编译输入和编译输出
incremental: 存储上次编译信息，增量
allowJs: 是否编译es6的js文件
checkJs: 对js文件进行check
sourceMap: 生成sourceMap文件


## 联合类型和类型保护
- 联合类型: |
- 类型保护： 断言
```js
interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {};
}

// 1. 类型断言
function trainAnimal(animal: Bird | Dog) {
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }


// 2. in 语法来做类型保护
function trainAnimal(animal: Bird | Dog) {
  if ('sing' in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// 3. typeof来做语法保护
function add(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`;
  }
  return first + second;
}

// 4. 使用 instanceof 语法来做类型保护
class NumberObject {
  count: number;
}

function addSecond(first: object | NumberObject, second: object | NumberObject) {
  if (first instanceof NumberObject && second instanceof NumberObject) {
    return first.count + second.count;
  }
  return 0;
}
```

## 枚举
```js
import { type } from 'os';

interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {};
}

// function trainAnimal(animal: Bird | Dog) {
//   if (animal.fly) {
//     (animal as Bird).sing();
//   } else {
//     (animal as Dog).bark();
//   }
// }

function trainAnimal(animal: Bird | Dog) {
  if ('sing' in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// typeof
function add(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`;
  }
  return first + second;
}


// 使用 instanceof 语法来做类型保护
class NumberObject {
  count: number;
}

function addSecond(first: object | NumberObject, second: object | NumberObject) {
  if (first instanceof NumberObject && second instanceof NumberObject) {
    return first.count + second.count;
  }
  return 0;
}
```