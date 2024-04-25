import { toKebabCase } from '../convert-name';
import { isClient } from '../is';
import { toCamelCase } from '../convert-name';
import type { CSSProperties } from 'vue';

const trim = (string: string) => (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');

export const hasClass = (el: Element, cls: string) => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

export const addClass = (el: Element, cls: string) => {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

export const hackCss = (attr: string, value: string) => {
  const prefix: string[] = ['webkit', 'Moz', 'ms', 'OT'];

  const styleObj: any = {};
  prefix.forEach(item => {
    styleObj['-' + toKebabCase(`${item}-${attr}`)] = value;
  });
  return {
    ...styleObj,
    [attr]: toKebabCase(value),
  };
};

/**
 * 获取dom元素的css变量值
 */
export function getCssRootVariableValue(key: string, el: string | HTMLElement = ':root') {
  const element = el instanceof HTMLElement ? el : document.querySelector(el);
  if (!element) {
    throw new Error('Could not find element with the provided selector or element');
  }
  const value = getComputedStyle(element)
    .getPropertyValue(key.startsWith('--') ? key : `--${key}`)
    .trim();
  return value;
}

/**
 * 设置dom元素的css变量值
 */
export function setCssRootVariableValue<T extends string>(
  key: T,
  value: string,
  el: string | HTMLElement = ':root',
) {
  const element = el instanceof HTMLElement ? el : (document.querySelector(el) as HTMLElement);
  if (!element) {
    throw new Error('Could not find element with the provided selector or element');
  }
  element.style.setProperty(key.startsWith('--') ? key : `--${key}`, value.trim());
}

export function getStyle(element: HTMLElement, styleName: keyof CSSProperties): string {
  if (!isClient || !element || !styleName) return '';
  let key = toCamelCase(styleName);
  if (key === 'float') key = 'cssFloat';
  try {
    const style = (element.style as any)[key];
    if (style) return style;
    const computed: any = document.defaultView?.getComputedStyle(element, '');
    return computed ? computed[key] : '';
  } catch {
    return (element.style as any)[key];
  }
}

export function classNameToArray(className: string) {
  return className.split(' ').filter(t => !!t.trim());
}

const pureNumberRegex = /^(\d|\.)+$/;
const numberRegex = /(\d|\.)+/;

interface FormatLengthOptions {
  c?: number;
  offset?: number;
  attachPx?: boolean;
}

/**
 * 格式化长度值。如果长度值是数字，它将被乘以一个系数并添加一个偏移量。如果长度值是字符串，它将尝试解析为数字进行同样的操作。如果无法解析为数字，它将尝试找到字符串中的数字并对其进行操作。
 *
 * @param {T} length - 要格式化的长度值，可以是数字、字符串、null或undefined。
 * @param {Object} options - 格式化选项。
 * @param {number} options.c - 乘以长度值的系数，默认为1。
 * @param {number} options.offset - 添加到长度值的偏移量，默认为0。
 * @param {boolean} options.attachPx - 是否在结果后附加'px'，默认为true。
 *
 * @returns {T} 格式化后的长度值。如果输入是数字或可以解析为数字的字符串，返回的将是字符串。否则，返回的将是输入的原始值。
 */
export function formatLength<T extends number | string | null | undefined | any>(
  length: T,
  { c = 1, offset = 0, attachPx = true }: FormatLengthOptions = {},
): T extends null
  ? null
  : T extends undefined
    ? undefined
    : T extends string | number
      ? string
      : T {
  if (typeof length === 'number') {
    const result = (length + offset) * c;
    if (result === 0) return '0' as any;
    return `${result}${attachPx ? 'px' : ''}` as any;
  } else if (typeof length === 'string') {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c;
      if (attachPx) {
        if (result === 0) return '0' as any;
        return `${result}px` as any;
      } else {
        return `${result}` as any;
      }
    } else {
      const result = numberRegex.exec(length);
      if (!result) return length as any;
      return length.replace(numberRegex, String((Number(result[0]) + offset) * c)) as any;
    }
  }
  return length as any;
}

export function addUnit(value?: string | number) {
  return formatLength(value);
}
