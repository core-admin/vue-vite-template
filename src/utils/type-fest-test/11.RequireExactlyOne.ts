/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequireExactlyOne } from 'type-fest';

type Responder = {
  text: () => string;
  json: () => string;
  secure: boolean;
};

const responder: RequireExactlyOne<Responder, 'text' | 'json'> = {
  // 此处添加 "text" 键会导致编译错误。

  json: () => '{"message": "ok"}',
  secure: true,
};

/**
 * 创建一个类型，该类型只需要一个给定的键，不允许更多的键。其余键值保持不变。
 *
 * 用例：
 * - 为只需要一个键就能正确显示的组件创建接口。
 * - 在一个地方声明通用键，用于通过 `RequireExactlyOne`缩小范围的单一用例。使用 `RequireExactlyOne` 时需要注意的是，TypeScript 并不总是在编译时就知道运行时会存在的每个键。因此，`RequireExactlyOne` 无法阻止它不知道的额外键。
 */
