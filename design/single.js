// 例1:
(function () {
  class SingleTon {
    constructor(name) {
      this.name = name;
      this.instance = null;
    }

    static getInstance(name) {
      if (!this.instance) {
        this.instance = new SingleTon(name);
      }
      return this.instance;
    }

    getName() {
      return this.name;
    }
  }


  const singleA = SingleTon.getInstance('a');
  const singleB = SingleTon.getInstance('b');
  console.log(singleA === singleB);
}());
