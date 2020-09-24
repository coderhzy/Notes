class JQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const length = result.length;
    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
    this.selector = selector;
  }

  get (index) {
    return this[index];
  }

  each (fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }

  on (type, fn) {
    return this.each(elem => {
      elem.addEventListener(type, fn, false);
    })
  }
}

  // 插件
  JQuery.prototype.dialog = function (info) {
  alert(info);
}

// 复写-“造轮子”
class myJQuery extends JQuery {
  constructor(selector) {
    super(selector);
  }
  // 扩展自己的方法
  addClass (className) {

  }
  style (data) {

  }
}

// const $p = new JQuery('p');
// $p.get(1);
// $p.each((elem) => console.log(elem.nodeName));
// $p.on('click', () => alert('clicked'));