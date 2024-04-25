/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UnknownArray } from 'type-fest';

/**
 * 您需要一种所有数组都可以赋值的类型，但您并不关心值。
 */

const arr: UnknownArray = [1, 2, 3];

// first type is unknown
const first = arr[0];
