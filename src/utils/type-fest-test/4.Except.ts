/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Except } from 'type-fest';

/**
 * 从不带特定键的对象类型创建类型。
 * 我们建议将 `requireExactProps` 选项设置为 `true`。
 * 该类型是 [`Omit`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the-omit-helper-type) 的更严格版本。
 * Omit` 类型不限制省略的键必须是给定类型中存在的键，而 `Except` 则是如此。
 * 更严格类型的好处是可以避免错别字，并允许编译器自动识别重命名重构。
 * 有人曾向 TypeScript 团队提议使用这种类型，但被拒绝了，因为他们更倾向于由库实现更严格版本的内置类型（[microsoft/TypeScript#30825](https://github.com/microsoft/TypeScript/issues/30825#issuecomment-523668235)）。
 */

type Foo = {
  a: number;
  b: string;
};

type FooWithoutA = Except<Foo, 'a'>;

const fooWithoutA: FooWithoutA = { a: 1, b: '2' }; // error

/**
 * 请注意，`requireExactProps` 选项默认为 `false`。
 * 它的用处用来提示 TypeScript 编译器，确保省略的键必须是给定类型中存在的键。
 */
type FooWithoutB = Except<Foo, 'b', { requireExactProps: true }>;

/**
 * 使用 Omit 做二次类型时，被移除掉的健将在类型中不保留，编辑器也不会给出任何提示，而使用 Except 时，也是如此。
 * 但使用 Except requireExactProps 时，被移除掉的键将在类型中保留，编辑器也会给出提示，只是值被强制指定为 undefined。
 */
const fooWithoutB: FooWithoutB = { a: 1, b: undefined }; // error
