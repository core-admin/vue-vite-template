/* eslint-disable @typescript-eslint/no-unused-vars */
import type { OverrideProperties } from 'type-fest';

type Foo = {
  a: string;
  b: string;
};
type Bar = OverrideProperties<Foo, { b: number }>;
// => {a: string, b: number}

type Baz = OverrideProperties<Foo, { c: number }>;
// Error, type '{ c: number; }' does not satisfy the constraint '{ c: never; }'

type Fizz = OverrideProperties<Foo, { b: number; c: number }>;
// Error, type '{ b: number; c: number; }' does not satisfy the constraint '{ b: number; c: never; }'

/**
 * 覆盖给定类型的现有属性。
 * 类似于 `Merge`，但会强制要求原始类型具有要覆盖的属性。
 * 当你想用不同的类型覆盖现有属性，并确保这些属性确实存在于原始类型中时，这就非常有用了。
 *
 * 对于想强制修改现有类型的属性的情况，这个类型非常有用。
 */
