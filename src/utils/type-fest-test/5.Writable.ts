/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Writable } from 'type-fest';

type Foo = {
  readonly a: number;
  readonly b: readonly string[]; // 说明只有属性的可变性状态会受到影响，而不是它们的值。
  readonly c: boolean;
};

const writableFoo: Writable<Foo> = { a: 1, b: ['2'], c: true };
writableFoo.a = 3;
writableFoo.b[0] = 'new value'; // 仍然会失败，因为属性 "b "的值仍然是只读类型。
writableFoo.b = ['something']; // 将起作用，因为 "b "属性本身不再是只读属性。

type SomeWritable = Writable<Foo, 'b' | 'c'>;
// type SomeWritable = {
//   readonly a: number;
//   b: readonly string[]; // It's now writable. The type of the property remains unaffected.
//   c: boolean; // It's now writable.
// };

// 还支持数组
const readonlyArray: readonly number[] = [1, 2, 3];
readonlyArray.push(4); // 会失败，因为数组本身是只读的。
readonlyArray[0] = 3; // 类型 "readonly number[]" 中的索引签名仅允许读取

const writableArray: Writable<typeof readonlyArray> = readonlyArray as Writable<
  typeof readonlyArray
>;
writableArray.push(4); // 由于数组本身现在是可写的，因此可以正常工作。

/**
 * 创建一个从给定类型中删除 `readonly` 的类型，与 `Readonly<T>`相反。
 * 如果输入类型不是对象，第二个参数将被忽略。
 * 注意：该类型可以使只读的 `Set` 和 `Map` 变成可写的。
 * 此行为不同于 `Readonly<T>`（截至 TypeScript 5.2.2）。请参阅： https://github.com/microsoft/TypeScript/issues/29655 它可用于[在类中存储和更改选项](https://github.com/sindresorhus/pageres/blob/4a5d05fca19a5fbd2f53842cbf3eb7b1b63bddd2/source/index.ts#L72)、[在测试中编辑`readonly`对象](https://stackoverflow.com/questions/50703834)、[在函数中构造`readonly`对象](https://github.com/Microsoft/TypeScript/issues/24509)，或用于定义一个单一模型，其中唯一的变化是某些键是否可写。
 */
