/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LiteralUnion } from 'type-fest';

// Before

type Pet = 'dog' | 'cat' | string;

/**
 * 在支持 TypeScript 的集成开发环境中开始键入。您将无法自动完成 `dog` 和 `cat` 字面。
 */
const pet: Pet = '';

// After

type Pet2 = LiteralUnion<'dog' | 'cat', string>;

/**
 * 您将获得 `dog` 和 `cat` 字面自动完成功能。
 */
const pet2: Pet2 = 'dog';

/**
 * 允许通过组合基元类型和字面类型创建联合类型，而无需牺牲联合类型字面类型部分在集成开发环境中的自动完成功能。
 * 目前，当基元类型的联合类型与字面类型相结合时，TypeScript 会丢失所有关于组合字面类型的信息。
 * 因此，在具有自动完成功能的集成开发环境中使用这种类型时，不会对声明的字面类型提出任何建议。该类型是 [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729)的一种变通方法。一旦不再需要，它将被删除。
 */
