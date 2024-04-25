/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Merge } from 'type-fest';

interface Foo {
  [x: string]: unknown;
  [x: number]: unknown;
  foo: string;
  bar: symbol;
}

type Bar = {
  [x: number]: number;
  [x: symbol]: unknown;
  bar: Date;
  baz: boolean;
};

export type FooBar = Merge<Foo, Bar>;
// => {
// [x: string]: unknown;
// [x: number]: number;
// [x: symbol]: unknown;
// foo: string;
// bar: Date;
// baz: boolean;
// }
