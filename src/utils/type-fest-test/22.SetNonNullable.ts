/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SetNonNullable } from 'type-fest';

type Foo = {
  a: number | null;
  b: string | undefined;
  c?: boolean | null;
};

type SomeNonNullable = SetNonNullable<Foo, 'b' | 'c'>;

type AllNonNullable = SetNonNullable<Foo>;

const foo: AllNonNullable = {
  a: 1,
  // b: 'b',
  b: undefined, // 缺少 b 字段会报错
  c: null, // error
};

/**
 * 去除给定键的类型中的 null 和 undefined。
 */
