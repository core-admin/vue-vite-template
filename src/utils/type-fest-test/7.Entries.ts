/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Entries } from 'type-fest';

interface Example {
  someKey: number;
}

const manipulatesEntries = (examples: Entries<Example>) =>
  examples.map(example => {
    /**
     * example -> Object.entries item -> [someKey, 1] 增强了类型信息
     *
     * 但只能针对对象中只有一个键值对的情况进行处理，如果有多个键值对，那么value的类型将会是联合类型
     */

    return [
      // 对密钥进行任意处理（提供类型信息）
      example[0].toUpperCase(),

      // 对值进行任意处理（提供类型信息）
      example[1].toFixed(),
    ];
  });

const example: Example = { someKey: 1 };
const entries = Object.entries(example) as Entries<Example>;
const output = manipulatesEntries(entries);

// Objects
const objectExample = { a: 1 };
const objectEntries: Entries<typeof objectExample> = [['a', 1]];

// Arrays
const arrayExample = ['a', 1];
const arrayEntries: Entries<typeof arrayExample> = [
  [0, 'a'],
  [1, 1],
];

// Maps
const mapExample = new Map([['a', 1]]);
const mapEntries: Entries<typeof map> = [['a', 1]];

// Sets
const setExample = new Set(['a', 1]);
const setEntries: Entries<typeof setExample> = [
  ['a', 'a'],
  [1, 1],
];
