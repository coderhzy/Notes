// es6 模块化
declare module 'jquery' {
  interface JqueryStance {
    html: (html: string) => JqueryStance;
  }

  // 混合类型
  function $(readyFunc: () => void): void;
  function $(param: string): JqueryStance;

  namespace $ {
    namespace fn {
      class init { }
    }
  }
  export = $;
}










// 定义全局变量
// declare var $: (param: () => void) => void;

// 定义全局函数
// interface JqueryStance {
//   html: (html: string) => JqueryStance;
// }

// 函数重载
// declare function $(readyFunc: () => void): void;
// declare function $(param: string): JqueryStance;

// 如何对对象进行类型定义，以及对类进行类型定义，已经命名空间对嵌套
// declare namespace $ {
//   namespace fn {
//     class init { }
//   }
// }

// interface JQuery {
//   (readyFunc: () => void): void;
//   (param: string): JqueryStance;
// }

// declare var $: JQuery;

