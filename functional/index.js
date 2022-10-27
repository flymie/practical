function mod(y) {
  return x => x % y;
}

function eq(y) {
  return x => x === y;
}

function compose(...fns) {
  if (fns.length === 0) {
    return x => x;
  }

  if (fns.length === 1) {
    return (...args) => fns[0](...args);
  }

  return fns.reduce((acc, cur) => (...args) => acc(cur(...args)));
}

const mod2 = mod(2);
const eq1 = eq(1);

const isOdd = compose(eq1, mod2);

console.log(isOdd(1));
