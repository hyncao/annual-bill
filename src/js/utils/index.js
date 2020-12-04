export const delay = (during) =>
  new Promise((resolve) => setTimeout(resolve, during));

export function throttle(func, wait = 500) {
  let isLock = false;
  return (...args) => {
    if (!isLock) {
      isLock = true;
      func.apply(this, args);
      setTimeout(() => {
        isLock = false;
      }, wait);
    }
  };
}

export function debounce(func, wait = 500, isImmediate) {
  let timer = null;
  return (...args) => {
    const context = this;
    if (isImmediate) {
      if (timer) {
        return;
      }
      func.apply(context, args);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, wait);
    } else {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

export class MyCtx {
  constructor(ctx) {
    this.ctx = ctx;
    for (let i in ctx) {
      const temp = this.ctx[i];
      if (typeof temp === 'function') {
        this.ctx[i] = (...rest) => {
          temp.apply(this.ctx, rest);
          return this.ctx;
        };
      }
    }
    return this.ctx;
  }
}

export const rem2Px = (rem) =>
  (window.document.documentElement.clientWidth / 7.5) * rem;
