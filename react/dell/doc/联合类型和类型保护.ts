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