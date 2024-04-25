/**
 * @description:  Set ui mount node
 */
export const getPopupContainer = (node?: HTMLElement): HTMLElement => {
  return (node?.parentNode as HTMLElement) ?? document.body;
};

/**
 * 根据选择器查询父元素，并返回查询到的所有父元素
 */
export function getParentsUntil(el: Element, selector: string): Element[] {
  const parents: Element[] = [];
  let _el: Element | null = el.parentNode as Element;
  while (_el && typeof _el.matches === 'function') {
    parents.unshift(_el);
    if (_el.matches(selector)) return parents;
    else _el = _el.parentNode as Element;
  }
  return [];
}

/**
 * 获取元素的所有祖先元素
 */
export function getAncestors(el: Element): Element[] {
  const ancestors: Element[] = [];
  let _el: Element | null = el.parentNode as Element;
  while (_el) {
    ancestors.unshift(_el);
    _el = _el.parentNode as Element;
  }
  return ancestors;
}

/**
 * 根据当前元素，获取指定位置的兄弟节点
 */
export function getSiblingByPosition(el: HTMLElement, distance: number, elClass: string) {
  const { parentNode } = el;
  if (!parentNode) return null;
  const siblings = parentNode.querySelectorAll(elClass);
  const index = Array.prototype.indexOf.call(siblings, el);
  return siblings[index + distance] || null;
}
