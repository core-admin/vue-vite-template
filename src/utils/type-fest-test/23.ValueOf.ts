import type { ValueOf } from 'type-fest';

/**
 * 创建给定对象值的联合体，可选择指定从哪些键获取值。
 */

const data = {
  foo: 1,
  bar: 2,
  biz: 3,
} as const;

// type Res = ValueOf<typeof data>; // no as const >>> number
// type Res = ValueOf<typeof data>; // as const >>> 1 | 2 | 3

export function getData(name: string): ValueOf<typeof data> {
  return data[name];
}

export function onlyBar(name: string): ValueOf<typeof data, 'bar'> {
  return data[name];
}

getData('foo'); // 1

onlyBar('foo'); // ??

onlyBar('bar');
