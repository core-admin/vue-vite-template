/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequireAllOrNone } from 'type-fest';

type Responder = {
  text?: () => string;
  json?: () => string;
  secure: boolean;
};

const responder1: RequireAllOrNone<Responder, 'text' | 'json'> = {
  secure: true,
};

const responder2: RequireAllOrNone<Responder, 'text' | 'json'> = {
  text: () => '{"message": "hi"}',
  json: () => '{"message": "ok"}',
  secure: true,
};

/**
 * 创建一个类型，该类型需要所有给定的键或不需要任何给定的键。其余键值保持不变。
 * 用例：为具有互斥键的组件创建接口。
 *
 * `RequireAllOrNone` 的注意事项是，TypeScript 并不总是在编译时就知道运行时存在的每个键。因此，`RequireAllOrNone` 无法阻止它不知道的额外键。
 *
 * RequireAllOrNone 根据传入的联合类型表明，只要在联合类型中指定的属性要么全部存在，要么全部不存在，否则就会报错，未指定的属性不受影响，遵循原来的定义。
 */
