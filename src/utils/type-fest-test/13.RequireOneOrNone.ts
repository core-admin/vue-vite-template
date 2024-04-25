/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequireOneOrNone } from 'type-fest';

type Responder = RequireOneOrNone<
  {
    text: () => string;
    json: () => string;
    secure: boolean;
  },
  'text' | 'json'
>;

const responder1: Responder = {
  secure: true,
};

const responder2: Responder = {
  text: () => '{"message": "hi"}',
  secure: true,
};

const responder3: Responder = {
  json: () => '{"message": "ok"}',
  secure: true,
};

/**
 * 创建一个类型，该类型只需要一个给定的键，不允许更多或任何给定的键。其余键值保持不变。
 *
 * 要么一个都没有，要么只有一个。
 */
