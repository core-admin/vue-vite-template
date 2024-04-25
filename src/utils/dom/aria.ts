/**
 * 检查页面底部是否可见（是否滚动到了底部）
 */
export function bottomVisible() {
  return (
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  );
}

/**
 * 检查元素是否可见
 * @param el 元素
 * @param partiallyVisible 是否部分可见，默认为 false，即全部可见时才返回 true
 */
export function elementIsVisibleInViewport(el: Element, partiallyVisible = false) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

/**
 * 确定目标元素是否可聚焦
 * @param element 要聚焦的元素
 * @returns 如果元素可聚焦，则为 true。
 */
export function isFocusable(element: HTMLElement): boolean {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true;
  }
  // HTMLButtonElement has disabled
  if ((element as HTMLButtonElement).disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A': {
      // casting current element to Specific HTMLElement in order to be more type precise
      return (
        !!(element as HTMLAnchorElement).href && (element as HTMLAnchorElement).rel !== 'ignore'
      );
    }
    case 'INPUT': {
      return !(
        (element as HTMLInputElement).type === 'hidden' ||
        (element as HTMLInputElement).type === 'file'
      );
    }
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA': {
      return true;
    }
    default: {
      return false;
    }
  }
}

/**
 * 将焦点设置为当前节点
 * @param element 要聚焦的元素
 * @returns 如果元素被聚焦，则为 true。
 */
export function attemptFocus(element: HTMLElement): boolean {
  if (!isFocusable(element)) {
    return false;
  }
  element.focus?.();
  return document.activeElement === element;
}
