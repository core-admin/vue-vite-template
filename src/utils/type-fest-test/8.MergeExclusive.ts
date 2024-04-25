/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MergeExclusive } from 'type-fest';

interface ExclusiveVariation1 {
  exclusive1: boolean;
}

interface ExclusiveVariation2 {
  exclusive2: string;
}

type ExclusiveOptions = MergeExclusive<ExclusiveVariation1, ExclusiveVariation2>;

let exclusiveOptions: ExclusiveOptions;

exclusiveOptions = { exclusive1: true }; // => Works
exclusiveOptions = { exclusive2: 'hi' }; // => Works
exclusiveOptions = { exclusive1: true, exclusive2: 'hi' }; // => Error

/**
 * 创建一个具有互斥键的类型。
 */
