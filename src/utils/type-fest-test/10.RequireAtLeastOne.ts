/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequireAtLeastOne } from 'type-fest';

type Responder = {
  text?: () => string;
  json?: () => string;
  secure?: boolean;
};

const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
  text: () => 'text',
  json: () => 'json',
};

// responder.json

// responder.text();

// responder.json?.()

/**
 * 创建一个至少需要一个给定键的类型。其余键保持不变。
 */
