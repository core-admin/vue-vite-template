export interface ViewportOffsetResult {
  left: number;
  top: number;
  right: number;
  bottom: number;
  rightIncludeBody: number;
  bottomIncludeBody: number;
}

export const getBoundingClientRect = (element: Element): DOMRect | number => {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
};

/**
 * 获取当前元素的左侧和顶部偏移量（基于浏览器视口（viewport））
 * left: 元素最左侧到文档左侧的距离
 * top: 元素顶部到文档顶部的距离
 * right: 元素最右侧到文档右侧的距离（包含滚动条在内）
 * bottom: 元素底部到文档底部的距离
 * rightIncludeBody: 元素最左侧到文档右侧的距离
 * bottomIncludeBody: 元素底部到文档底部的距离（大于0说明进入了可视范围内）
 */
export const getViewportOffset = (element: HTMLElement): ViewportOffsetResult => {
  const doc = document.documentElement;

  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;

  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;

  const box = getBoundingClientRect(element);

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect;

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;

  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;

  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  };
};

/**
 * 获取指定元素距离文档顶部的距离（top + 页面滚动距离，相对位置）
 */
export function getOffsetTop(element: HTMLElement) {
  let offset = 0;
  let parent = element;

  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }

  return offset;
}

/**
 * 计算 el 元素相对于 containerEl 元素的垂直偏移距离。
 * 通过分别计算 el 和 containerEl 相对于文档顶部的偏移量，然后计算这两个偏移量之差的绝对值来实现的。
 * 这个差值表示了两个元素在垂直方向上的相对距离。
 */
export function getOffsetTopDistance(el: HTMLElement, containerEl: HTMLElement) {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
}

/**
 * 获取鼠标或触摸事件的坐标（绝对位置，不受滚动条影响）
 */
export function getClientXY(event: MouseEvent | TouchEvent) {
  let clientX: number;
  let clientY: number;
  if (event.type === 'touchend') {
    clientY = (event as TouchEvent).changedTouches[0].clientY;
    clientX = (event as TouchEvent).changedTouches[0].clientX;
  } else if (event.type.startsWith('touch')) {
    clientY = (event as TouchEvent).touches[0].clientY;
    clientX = (event as TouchEvent).touches[0].clientX;
  } else {
    clientY = (event as MouseEvent).clientY;
    clientX = (event as MouseEvent).clientX;
  }
  return {
    clientX,
    clientY,
  };
}

/**
 * 获取页面的真实高度
 */
export function getPageScrollHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

/**
 * 获取当前可视范围的高度
 */
export function getViewportHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }
  return clientHeight;
}
