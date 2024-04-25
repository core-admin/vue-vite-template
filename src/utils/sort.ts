import { swap } from './helper';

function _stringPermutationGenerate(n: number, heapArr: string[], result: string[]) {
  if (n === 1) {
    result.push(heapArr.join(''));
  } else {
    _stringPermutationGenerate(n - 1, heapArr, result);
    for (let i = 0; i < n - 1; i++) {
      if (n % 2 === 0) {
        swap(heapArr, i, n - 1);
      } else {
        swap(heapArr, 0, n - 1);
      }
      _stringPermutationGenerate(n - 1, heapArr, result);
    }
  }
}

/**
 * 计算字符串的所有排列组合
 */
export function stringPermutations(str: string): string[] {
  const result: string[] = [];
  const heapArr = str.split('');
  _stringPermutationGenerate(heapArr.length, heapArr, result);
  return result;
}

function _listPermutationGenerate<T>(n: number, heapArr: T[], result: T[][]) {
  if (n === 1) {
    result.push([...heapArr]);
  } else {
    _listPermutationGenerate(n - 1, heapArr, result);
    for (let i = 0; i < n - 1; i++) {
      if (n % 2 === 0) {
        swap(heapArr, i, n - 1);
      } else {
        swap(heapArr, 0, n - 1);
      }
      _listPermutationGenerate(n - 1, heapArr, result);
    }
  }
}

/**
 * 计算数组项中所有排列组合
 */
export function listPermutations<T>(list: T[]): T[][] {
  const result: T[][] = [];
  _listPermutationGenerate(list.length, list, result);
  return result;
}
