// 父类
class People {
  constructor(name) {
    this.name = name;
  }
  eat () {
    console.log(`${this.name} eat somthing`);
  }
}

// 子类1
class Student extends People {
  constructor(name, number) {
    super(name); // 父类方法
    this.number = number;
  }
  sayHi () {
    console.log(` 姓名 ${this.name} 学号 ${this.number}`);
  }
}

// 子类2
class Teacher extends People {
  constructor(name, major) {
    super(name);
    this.major = major;
  }
  teach () {
    console.log(`${this.name} 教授 ${this.major}`);
  }
}


// 实例1
const xialuo = new Student("夏洛", 100);
console.log(xialuo.name);
console.log(xialuo.number);
xialuo.sayHi();
xialuo.eat();

// 实例2
const wanglaoshi = new Teacher("王老师", "语文");
console.log(wanglaoshi.name);
console.log(wanglaoshi.major);
wanglaoshi.teach();
wanglaoshi.eat();
