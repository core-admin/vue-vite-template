export function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

export function off(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: AnyFunction<any>,
) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false);
  }
}

export function once(el: HTMLElement, event: string, fn: EventListener) {
  const listener = function (this: any, ...args: unknown[]) {
    if (fn) {
      fn.apply(this, args);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
}

/**
 * 派发事件
 */
export function triggerEvent(element: HTMLElement, name: string, ...opts: Array<any>): HTMLElement {
  let event: Event;

  if (name.includes('mouse') || name.includes('click')) {
    // 使用 MouseEvent 构造函数
    event = new MouseEvent(name, { bubbles: opts[0], cancelable: opts[1] });
  } else if (name.includes('key')) {
    // 使用 KeyboardEvent 构造函数
    // 注意：KeyboardEvent 的构造函数可能需要更多的参数，如 key, code 等
    event = new KeyboardEvent(name, { bubbles: opts[0], cancelable: opts[1] });
  } else {
    // 对于其他事件，使用 Event 构造函数
    event = new Event(name, { bubbles: opts[0], cancelable: opts[1] });
  }

  element.dispatchEvent(event);
  return element;
}
