/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EmptyObject } from 'type-fest';

const foo1: {} = {}; // Pass
const foo2: {} = []; // Pass
const foo3: {} = 42; // Pass
const foo4: {} = { a: 1 }; // Pass

const bar1: EmptyObject = {}; // Pass
const bar2: EmptyObject = 42; // Fail
const bar3: EmptyObject = []; // Fail
const bar4: EmptyObject = { a: 1 }; // Fail

/**
 * 代表严格为空的纯对象，即 `{}` 值。当您将某个内容注释为 `{}` 类型时，除了 `null` 和 `undefined`，它可以是任何内容。
 * 这意味着不能使用 `{}` 表示空的普通对象（[更多](https://stackoverflow.com/questions/47339869/typescript-empty-object-and-any-difference/52193484#52193484)）。
 */
