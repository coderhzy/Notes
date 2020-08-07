// interface Point {
//   x: number,
//   y: number
// }


// const point: Point = {
//   x: 3,
//   y: 4
// }


// 基础类型和对象类型 类型注解 
// 基础类型 null, undefined,symbol,boolean,void
// let count: number = 123;
// const teacherName: string = 'dell';

// // 对象类型
// const teacher: {
//   name: string,
//   age: number
// } = {
//   name: 'hell',
//   age: 18
// };

// const numbers: number[] = [1, 2, 3];

// class Person { }

// const dell: Person = new Person();

// const getTotal: () => number = () => {
//   return 123;
// }



// type annotation 类型注解。我们来告诉TS变量是什么类型。
// type inference 类型推断。TS会自动尝试分析变量的类型。
// 如果typeScript能够自动分析变量类型，我们就什么也不需要做了。
// 如果TS 无法分析变量类型的话，我们就需要使用类型注解。

// let count: number;
// count = 123;

// let countInference = 123;

// const firstNumber = 1;
// const secondNumber = 2;
// const total = firstNumber + secondNumber;

// function getTotal(firstNumber: number, secondNumber: number) {
//   return firstNumber + secondNumber;
// }

// const total = getTotal(1, 2);

// const obj = {
//   name: 'dell',
//   age: 18
// }



// void 这个函数不应该有返回值
// function add(first: number, second: number): number {
//   return first + second;
// };

// const total: number = Number(add(1, 2));

// function sayHello(): void {
//   console.log('hello');
// }


// never
// function errorEmitter(): never {
//   // throw new Error();
//   // console.log(123);
//   while (true) {
//   }
// }

// 解构
// function add({ first, second }: { first: number, second: number }): number {
//   return first + second;
// }
// const total = add({ first: 1, second: 2 });

// function getNumber({ first }): { first: number } {
//   return first;
// }

// const count = getNumber({ first: 1 });



// 基础类型, boolean ,number,string,void,undefined,symbol,null
// let count: number;
// const count = 123;

// 对象类型,{},Class,function , []
// const func = (str: string): number => {
//   return parseInt(str, 10);
// }

// const func1: (str: string) => number = (str) => {
//   return parseInt(str, 10);
// }

//函数的两种写法test
// const func = (str: string): number => {
//   return parseInt(str, 10);
// }
// const func1: (str: string) => number = str => {
//   return parseInt(str, 10);
// }


// const data = new Date();

//  其他的case
// interface Person {
//   name: string
// }
// const rawData = '{"name": "hello"}';
// const newData: Person = JSON.parse(rawData);
// console.log(newData); // { name: 'hello' }


// let temp: number | string = 123;
// temp = '456';


// 数组和元组
// const numberArr: (number | string)[] = [1, 2, 3];
// const stringArr: string[] = ['a', 'b'];
// const undefinedArr: undefined[] = [undefined];


// // type alias 类型别名
// type User = { name: string, age: number };


// const ObjectArr: User[] = [{
//   name: 'ac',
//   age: 28
// }];

// class Teacher {
//   name: string;
//   age: number;
// }

// const objectArr: Teacher[] = [
//   new Teacher(),
//   {
//     name: 'hello',
//     age: 123
//   }
// ]

// //数组test
// const numberArr: (number | string)[] = [1, '123'];


// // 元组 tuple ,  特殊的数组 [有固定项]
// const teacherInfo: [string, string, number] = ['dell', 'male', 19];

// 元组应用场景， csv
// const teacherList: [string, string, number][] = [
//   ['dell', 'male', 19],
//   ['sun', 'female', 26],
//   ['jeny', 'female', 23]
// ]



// interface接口  了解强校验->直接传入对象详情
//  interface is similar  with type ,but not absolute like type
// interface to be not change to JavaScript
// interface Person {
//   name: string;
//   age?: number;
//   [propName: string]: any; // Person 处理name和age还可以有其他的string
//   say(): string;
// }


// // interface extens
// interface Teacher extends Person {
//   teach(): string;
// }

// //  use interface instead function
// interface SayHi {
//   (word: string): string
// }


// const getPersonName = (person: Person): void => {
//   console.log(person.name);
// }

// const setPersonName = (person: Teacher, name: string): void => {
//   person.name = name; // readonly ——> error
// }

// const person = {
//   name: "dell",
//   sex: 'male',
//   say() { return 'say hello' },
//   teach() {
//     return 'teach';
//   }
// };

// getPersonName(person);
// setPersonName(person, 'lee');


// // class application interface 
// class User implements Person {
//   name = 'dell';
//   say() {
//     return 'hello';
//   }
// }


// const say: SayHi = (word: string) => {
//   return word;
// }




// // class, hwo to def class and write prop in class 、 methods
// // class extends
// // childClass rewrite parentClass
// // super effect : After we use childClass rewrite parentClass ,we can use super call parent methods.
// class Person {
//   name: string = 'dell';
//   getName() {
//     return this.name;
//   }
// }

// class Teacher extends Person {
//   getTeacherName() {
//     return 'Teacher';
//   };
//   getName() {
//     return super.getName() + 'lee';
//   }
// }

// const teacher = new Teacher();
// console.log(teacher.getName());
// console.log(teacher.getTeacherName());



// // class in accessType and constructor   ->  private,protected,public --> accessType
// // public : allow us class inside and outside called
// // private : allow us class inside
// // protect: allow us class inside and extends childClass classed
// class Person {
//   private name: string = '';
//   private sayHi() {
//     this.name;
//     console.log('hi');
//   }
// }

// class Teacher extends Person {
//   public sayBye() {
//     this.name   // name is private --->>> error
//   }
// }


// const person = new Person();
// person.name = 'dell';
// console.log(person.name);
// person.sayHi();

// // constructor
// class Preson {
//   //传统写法
//   // private name: string;
//   // constructor(name: string) {
//   //   this.name = name;
//   // }

//   // 简化写法
//   constructor(public name: string) { }
// }

// const person = new Preson('dell');
// console.log(person.name);



// // if childClass extends parentClass, you maybe call parentConsturctor then childClass has parentClass's nameValue and self age.
// class Person {
//   constructor(public name: string) {

//   }
// }

// class Teacher extends Person {
//   constructor(public age: number) {
//     super('dell');
//   }
// }

// const teacher = new Teacher(28);
// const person = new Person('hello');
// console.log(teacher.age);
// console.log(teacher.name);
// console.log(person.name);





// // static props, setter,getter
// class Person {
//   constructor(private _name: string) { }
//   get name() {
//     return this._name + 'lee';
//   }
//   set name(mame: string) {
//     const realName = name.split(' ')[0];
//     this._name = name;
//   }
// }

// const person = new Person('dell');
// console.log(person.name);
// person.name = 'dell lee';


// // single case
// // static : state to be mount methods to Class , no classExample
// class Demo {
//   private static instance: Demo;
//   private constructor(public name: string) { }

//   public static getInstance() {
//     if (!this.instance) {
//       this.instance = new Demo('dell lee');
//     }
//     return this.instance;
//   }
// }

// const demo1 = Demo.getInstance(); // to first call --> this.instance = new Demo; --> renturn this.instance
// const demo2 = Demo.getInstance(); // to second call --> return this.instance 
// console.log(demo1.name);
// console.log(demo2.name);


// // abstract class
// // readonly
// class Person {
//   public readonly name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const person = new Person('dell lee');
// console.log(person.name);
// person.name = 'hello world'; // reaonly ---> error to be setted
// console.log(person.name);


// // abstract class
// // we take common Class methods def in abstract
// abstract class Geom {
//   width: number;
//   getType() {
//     return 'ghea';
//   }
//   abstract getArea(): number;
// }

// new Geom() // error --> abstract can not new 

// class Circle extends Geom {
//   getArea() {
//     return 123;
//   }
// }

// class square {
// }

// class Triangle {
// }



// // use interface optimization
// interface Person {
//   name: String
// }


// interface Teacher extends Person {
//   teachingAge: number;
// }

// interface Student extends Person {
//   age: number,
// }

// const teacher = {
//   name: 'dell',
//   teachingAge: 123
// }

// const student = {
//   name: 'lee',
//   age: 18
// }

// const getUserInfo = (user: Person) => {
//   console.log(user.name);
// }

// getUserInfo(teacher);
// getUserInfo(student);