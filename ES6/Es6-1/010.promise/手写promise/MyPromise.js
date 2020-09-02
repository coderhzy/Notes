const MyPromise = (() => {
  const PENDING = "pending",
    RESOLVED = "resolved",
    REJECTD = "rejectd",
    PromiseValue = Symbol("PromiseValue"), //状态数据
    PromiseStatus = Symbol("PromiseStatus"),// 当前状态
    changeStatus = Symbol("changeStatus");//改变状态

  return class Promise {

    /**
     * 
     * @param {*} newStatus 新状态
     * @param {*} newValue 新值
     */
    [changeStatus] (newStatus, newValue) {
      if (this[PromiseStatus] !== PENDING) {
        //状态无法变更
        return;
      }
      this[PromiseStatus] = newStatus;
      this[PromiseValue] = newValue;
    }

    /**
     * 
     * @param {*} executor  未决阶段（pending状态）下的处理函数
     */
    constructor(executor) {
      this[PromiseStatus] = PENDING;
      this[PromiseValue] = undefined;

      // resolve
      const resolve = data => {
        this[changeStatus](RESOLVED, data);
      }

      // reject 
      const reject = reason => {
        this[changeStatus](REJECTD, reason);
      }

      // 捕获错误
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }

  }
})();