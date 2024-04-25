/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PartialOnUndefinedDeep } from 'type-fest';

interface Settings {
  optionA: string;
  optionB: number | undefined;
  subOption: {
    subOptionA: boolean;
    subOptionB: boolean | undefined;
  };
}

const testSettings: PartialOnUndefinedDeep<Settings> = {
  optionA: 'foo',
  // 👉 optionB 字段 现在是可选项，可以省略
  subOption: {
    subOptionA: true,
    // 👉 subOptionB 现在也是可选项，可以省略
  },
};

/**
 * 将类型中的所有 undefined 字段转换为可选字段。
 */
