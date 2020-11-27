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
