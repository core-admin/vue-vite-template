import type { FunctionArgs } from '@vueuse/core';

export const useRafThrottle = <T extends FunctionArgs>(fn: T): T => {
  let locked = false;
  // @ts-ignore
  return function (...args: any[]) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(() => {
      // @ts-ignore
      fn.apply(this, args);
      locked = false;
    });
  };
};

// ----------------------------- 三方库推荐 -----------------------------

/**
 * 设置浏览器的全屏、退出、切换、及dom变化事件。
 * 推荐使用 screenfull.js 库
 * @see https://www.npmjs.com/package/screenfull
 */
