/**
 * 用于格式化数字，保留两位小数（四舍五入，整数不保留0）
 */
export function formatDecimalWithRounding(num: number): string {
  const numStr = num.toString();
  const dotIndex = numStr.indexOf('.');
  if (dotIndex === -1 || numStr.length - dotIndex - 1 <= 2) {
    return numStr;
  }
  return num.toFixed(2);
}

/**
 * 生成指定范围内的随机数（包含min max）
 */
export function randomNumberInRange(min = 0, max = 100) {
  // 包含min 不包含max
  // return Math.random() * (max - min) + min;
  return Math.random() * (max - min + 1) + min;
}

/**
 * 生成指定范围内的随机整数（包含min max）
 */
export function randomIntegerInRange(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 检查给定数字是否在指定范围内。
 * - 使用算术比较来检查给定的数字是否在指定范围内。
 * - 如果未指定第二个参数end，则范围被视为从0到start。
 *
 * @example
 * inRange(3, 2, 5); // true
 * inRange(3, 4); // true
 * inRange(2, 3, 5); // false
 * nRange(3, 2); // false
 */
export function inRange(n: number, start: number, end?: number): boolean {
  if (end && start > end) [end, start] = [start, end];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
}

/**
 * 补零函数：1 > 01
 */
export function padZero(num: number | string, targetLength = 2): string {
  let str = num + '';
  while (str.length < targetLength) {
    str = '0' + str;
  }
  return str;
}

/**
 * 将数字限制在包含下限和上限的范围内
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char);
  if (index === -1) {
    return value;
  }
  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

/*
  expect(formatNumber('abc')).toEqual('');
  expect(formatNumber('1.2')).toEqual('1.2');
  expect(formatNumber('abc1.2')).toEqual('1.2');
  expect(formatNumber('123.4.')).toEqual('123.4');

  without dot
  expect(formatNumber('1.2', false)).toEqual('1');
  expect(formatNumber('abc1.2', false)).toEqual('1');
  expect(formatNumber('123.4.', false)).toEqual('123');

  minus
  expect(formatNumber('-1.2', false)).toEqual('-1');
  expect(formatNumber('-1.2', false, false)).toEqual('1');
  expect(formatNumber('-1.2', true)).toEqual('-1.2');
  expect(formatNumber('-1.2-', true)).toEqual('-1.2');
  expect(formatNumber('123-')).toEqual('123');
*/
export function formatNumber(value: string, allowDot = true, allowMinus = true): string {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;

  return value.replace(regExp, '');
}

/**
 * 处理相加运行时出现的浮点数问题
 * @example console.log(0.1 + 0.2); // 0.30000000000000004
 */
export function addNumber(num1: number, num2: number): number {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

/**
 * 指定小数位数四舍五入
 */
export function round(num: number, decimals = 0): number {
  return Number(`${Math.round(Number(`${num}e${decimals}`))}e-${decimals}`);
}

/**
 * 将数字格式化成千分位格式
 */
export function formatNumberToThousands(num: number): string {
  // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * 转成百分比
 */
export function numPercentage(num: number, digit: number = 0): string {
  return `${Math.abs(Number(num) * 100).toFixed(digit)}%`;
}
