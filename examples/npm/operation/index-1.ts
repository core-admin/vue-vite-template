/**
 * 文章：https://juejin.cn/post/7069965114564165662?searchId=20240322223823950078C49E888639ECD2
 *
 * https://github.com/Leslie-Wong-H/jsbi-calculator
 *
 * big.js、bignumber.js 和 decimal.js 之间的差别
 *
 * 三者都是处理数与运算的库。
 */

// JS 运算存在的精度丢失问题：

/*

// 加法
0.1 + 0.2 = 0.30000000000000004
0.7 + 0.1 = 0.7999999999999999
0.2 + 0.4 = 0.6000000000000001
2.22 + 0.1 = 2.3200000000000003

// 减法
1.5 - 1.2 = 0.30000000000000004
0.3 - 0.2 = 0.09999999999999998

// 乘法
19.9 * 100 = 1989.9999999999998
19.9 * 10 * 10 = 1990
1306377.64 * 100 = 130637763.99999999
1306377.64 * 10 * 10 = 130637763.99999999
0.7 * 180 = 125.99999999999999
9.7 * 100 = 969.9999999999999
39.7 * 100 = 3970.0000000000005

// 除法
0.3 / 0.1 = 2.9999999999999996
0.69 / 10 = 0.06899999999999999

*/

/**
 * toFixed() 方法
 *
 * JavaScript 内置的 toFixed() 方法可以将数字转换成保留指定小数位的字符串。
 * 这个方法适用于简单的金额计算。但需要注意舍入误差，因为转换后是字符串，失去了浮点数的特性，最后的结果坑你存在微小的误差。
 *
 * toFixed 它是一个四舍六入五成双的诡异的方法(也叫银行家算法)。
 * "四舍六入五成双"含义：对于位数很多的近似数，当有效位数确定后，其后面多余的数字应该舍去，只保留有效数字最末一位，
 * 这种修约（舍入）规则是“四舍六入五成双”，也即“4舍6入5凑偶”这里“四”是指≤4 时舍去，"六"是指≥6时进上，
 * "五"指的是根据5后面的数字来定，当5后有数时，舍5入1；当5后无有效数字时，需要分两种情况来讲：5前为奇数，舍5入1；5前为偶数，舍5不进（0是偶数）。
 */

import { round } from '/src/utils/number';

const num1 = 1;
console.log(num1.toFixed(2)); // 1.00

const num2 = 1.005;
console.log(num2.toFixed(2)); // 1.00

const num3 = 1.015;
/**
 * 1.015 转换成字符串后，保留两位小数，最后一位是 5，5 后面没有数字，看 5 前面的数字是奇数，所以舍 5 入 1，结果便是 1.01。
 * 需要注意的是，toFixed 方法与四舍五入不同，它是四舍六入五成双，所以 1.015 会被转换成 1.01。
 */
console.log('toFixed 1.015 >>> ', num3.toFixed(2)); // 1.01
console.log('1.015 四舍五入 >>> ', round(num3, 2)); // 1.02 四舍五入