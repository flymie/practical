Function.prototype.call2 = function (context, ...args) {
  context = context || window;

  const arrs = Array.prototype.map.call(args, (_, ind) => `argument${ind}`);
  context.fn = this;
  const res = eval(`context.fn(${arrs})`);
  delete context.fn;

  return res;
};

function FactoryObj() {
  const Constructor = Array.prototype.call.shift(arguments);
  const obj = Object.create(null);
  obj.__proto__ = Constructor.prototype;
}

Function.prototype.bind2 = function (context) {
  const self = this;
  const arrs = Array.prototype.slice.call(arguments, 1);

  function fpre() {}
  function fBound() {
    const args = Array.prototype.concat.call(arrs, arguments);
    return self.apply(this instanceof fpre ? this : context, args);
  }
  fpre.prototype = this.prototype;
  fBound.prototype = new fpre();

  return fBound;
};

function debounce(fn, delay, immediate) {
  let timer = null;

  return function (...args) {
    const ths = this;
    clearTimeout(timer);

    if (immediate) {
      const callNow = !timer;
      if (callNow) {
        fn.apply(ths, args);
      } else {
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(ths, args);
      }, delay);
    }
  };
}

function throttle(fn, delay) {
  let timer = null;

  return function (...args) {
    const ths = this;
    clearTimeout(timer);
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(ths, args);
      timer = null;
    }, delay);
  };
}
