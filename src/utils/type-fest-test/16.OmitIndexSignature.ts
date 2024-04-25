/* eslint-disable @typescript-eslint/no-unused-vars */
import type { OmitIndexSignature } from 'type-fest';

/**
 * 省略给定对象类型中的任何索引签名，只保留明确定义的属性。
 *
 * 用例：
 * - 删除第三方类型中过于宽松的签名。
 *
 * 它依赖于这样一个事实：空对象 (`{}`) 可以分配给只有索引签名的对象，如 `Record<string, unknown>`，但不能分配给有明确定义键的对象，如 `Record<'foo'|'bar', unknown>`。(实际值类型 `unknown` 与此无关，可以是任何类型。只有键类型才重要）。
 */

interface Example {
  // 这些索引签名将被删除。
  [x: string]: any;
  [x: number]: any;
  [x: symbol]: any;
  [x: `head-${string}`]: string;
  [x: `${string}-tail`]: string;
  [x: `head-${string}-tail`]: string;
  [x: `${bigint}`]: string;
  [x: `embedded-${number}`]: string;

  // These explicitly defined keys will remain.
  foo: 'bar';
  qux?: 'baz';
}

const obj: Example = {
  foo: 'bar',
  [Symbol('qux')]: 'baz',
  'head-foo': 'bar',
  '_head-foo': 'bar',
  0: 'bar',
};

type ExampleWithoutIndexSignatures = OmitIndexSignature<Example>;

const obj2: ExampleWithoutIndexSignatures = {
  foo: 'bar',
  qux: 'baz',
  aa: 'a', // error
  0: 'bar', // error
};

/**
 * PickIndexSignature 与 OmitIndexSignature 相反，只保留索引签名。
 */
