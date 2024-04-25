import { isClient } from '../is';
import { getStyle } from './style';

export type ScrollElement = Element | Window;

/**
 * 滚动到指定元素区域
 */
export function smoothScrollToElement(target: HTMLElement | string) {
  const _target = typeof target === 'string' ? document.querySelector(target) : target;
  _target?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * 获取滚动条宽度
 */
let scrollBarWidth: number;
export function getScrollBarWidth() {
  if (!isClient) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);
  const inner = document.createElement('div');
  outer.appendChild(inner);
  scrollBarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  return scrollBarWidth;
}

/**
 * 其判断依据是该元素是否设置过 overflow 属性，如果一个元素没有设置过 overflow 属性，
 * 其滚动是由于内容超出导致的，此时 isScroll 返回 false。
 */
export function isScroll(el: HTMLElement, isVertical?: boolean): boolean {
  if (!isClient) return false;
  const key = (
    {
      undefined: 'overflow',
      true: 'overflow-y',
      false: 'overflow-x',
    } as const
  )[String(isVertical)]!;
  const overflow = getStyle(el, key);
  return ['scroll', 'auto', 'overlay'].some(s => overflow.includes(s));
}

/**
 * 与以上同理
 */
export function getScrollContainer(
  el: HTMLElement,
  isVertical?: boolean,
): Window | HTMLElement | undefined {
  if (!isClient) return;
  let parent: HTMLElement = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) return window;
    if (isScroll(parent, isVertical)) return parent;
    parent = parent.parentNode as HTMLElement;
  }
  return parent;
}

export function getScrollTop(el: ScrollElement) {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}

export function setScrollTop(el: ScrollElement, value: number) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

/**
 * 获取页面被卷去的位置
 */
export function getRootScrollTop(): number {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  /*
    document.body.scrollTop
      ? {
          x: document.body.scrollLeft,
          y: document.body.scrollTop,
        }
      : {
          x: document.documentElement.scrollLeft,
          y: document.documentElement.scrollTop,
        };
  */
}

export function setRootScrollTop(value: number) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
