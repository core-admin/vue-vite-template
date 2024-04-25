/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UndefinedOnPartialDeep } from 'type-fest';

interface Settings {
  optionA: string;
  optionB?: number;
  subOption: {
    subOptionA: boolean;
    subOptionB?: boolean;
  };
}

const testSettingsA: Settings = {
  optionA: 'foo',
  /**
   * 如果 `exactOptionalPropertyTypes` 为 true，则出现 TypeScript 错误。
   * 可以不传，但只要传了就必须是 number 类型。
   */
  optionB: undefined,
  subOption: {
    subOptionA: true,
    subOptionB: undefined, // TypeScript error if `exactOptionalPropertyTypes` is true
  },
};

const testSettingsB: UndefinedOnPartialDeep<Settings> = {
  optionA: 'foo',
  // optionB?: number | undefined
  optionB: undefined, // 👉 `optionB` can be set to undefined now.
  subOption: {
    subOptionA: true,
    subOptionB: undefined, // 👉 `subOptionB` can be set to undefined now.
  },
};

/**
 * optionB?: number
 *
 * optionB: number | undefined
 *
 * optionB?: number | undefined
 *
 * 以上三种写法都是不同的，注意区分。
 */
