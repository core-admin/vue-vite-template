import Big from 'big.js';

/**
 * Infinity 、 NaN 和十六进制文字字符串，例如'0xff'，是无效的。
 */

const n1 = new Big(0.1);
console.log(n1); // 0.1

/**
 * object，其n1是Big构造函数创建了一个新的Big实例。
 * 为何console.log输出n1是个number 0.1呢？因为使用console.log输出时，JavaScript引擎会尝试将这个对象转换为一个适合打印的字符串形式，
 * 而Big.js库重写了toString方法，使得Big实例在被转换为字符串时，会返回其值。
 */
console.log(typeof n1); // object

const n2 = new Big('0.3');
console.log(n2); // 0.3

const n3 = Big(0.3);
console.log(n3); // 0.3

console.log('Big.DP', Big.DP); // 20 - DP是Big.js库的一个静态属性，涉及除法运算结果的最大小数位数

/**
 * Big.RM - 用于设置Big.js库的舍入模式，有以下几种取值：default value: 1
 * Big.roundDown 0 - 丢弃（向零取整）即截断，不进行四舍五入（总是向数值减小的方向舍入。例如，1.9将被舍入为1，-1.1将被舍入为-2。这是向绝对值减小的方向舍入，不管数字的正负。）
 * Big.roundHalfUp 1 - 四舍五入
 * Big.roundHalfEven 2 - 银行家舍入法 也就是四舍六入五成双
 * Big.roundUp 3 - 向上取整 总是向数值增加的方向舍入。例如，1.1将被舍入为2，-1.9将被舍入为-1。这是向绝对值增加的方向舍入，不管数字的正负。
 */

{
  // 加法
  const num1 = 0.1 + 0.2;
  console.log(num1); // 0.30000000000000004

  const num2 = Big(0.1).plus(0.2);
  console.log(num2); // 0.3
}

{
  // 减法
  const num1 = 0.3 - 0.1;
  console.log(num1); // 0.19999999999999998

  const num2 = Big(0.3).minus(0.1);
  console.log(num2); // 0.2
}

{
  // 乘法
  const num1 = 0.1 * 0.2;
  console.log(num1); // 0.020000000000000004

  const num2 = Big(0.1).times(0.2);
  console.log(num2); // 0.02
}

{
  // 除法
  const num1 = 0.3 / 0.1;
  console.log(num1); // 2.9999999999999996

  const num2 = Big(0.3).div(0.1);
  console.log(num2); // 3
}

{
  // 返回绝对值
  const num1 = Big(-0.8);
  console.log(num1.abs(), num1);

  // toNumber 方法将 Big 实例转换为 number 类型
  const num2 = num1.toNumber();
  // 需要注意的是：转换为 number 类型可能会导致精度损失，因为 big.js 被用于处理超出 number 类型精度范围的数值。如果你的数值非常大或者非常小，转换回 number 类型时要特别小心
  console.log(num2, typeof num2); // -0.8 number
}

{
  // 对比大小
  const num1 = Big(3);
  const num2 = Big(4);

  // num1 与 num2 进行大小比较
  const res1 = num1.cmp(num2);
  // a > b -> 1
  // a < b -> -1
  // a = b -> 0
  console.log(res1); // -1
  console.log(num1.cmp(2)); // 1
}

{
  // 大于
  const num1 = Big(3);
  const num2 = Big(4);
  console.log('大于', num1.gt(num2)); // false
}

{
  // 小于
  const num1 = Big(3);
  const num2 = Big(4);
  console.log('小于', num1.lt(num2)); // true
}

{
  // 大于等于
  const num1 = Big(3);
  const num2 = Big(4);
  console.log('大于等于', num1.gte(num2)); // false
}

{
  // 小于等于
  const num1 = Big(3);
  const num2 = Big(4);
  console.log('小于等于', num1.lte(num2)); // true
}

{
  // 相等
  const num1 = Big(0.1).plus(0.2).eq(0.3);
  console.log('相等', num1); // true

  console.log('普通比较 是否相等', 0.1 + 0.2 === 0.3); // false
}

{
  // 四舍五入
  const num1 = Big(0.389).round();
  const num2 = Big(0.589).round();
  console.log(num1, num2); // 0 1

  console.log(Big(0.389).round(2)); // 0.39
  console.log(Big(0.389).round(3)); // 0.389
}

{
  // Bigjs toFixed 始终返回标准数字字符串，即便数据很大也不会使用科学计数法
  const num1 = Big(1.22364);
  // 注意 Big.js 的 toFixed 有区别与 Number.prototype.toFixed（往整数靠拢）
  console.log('toFixed 1 >>>', num1.toFixed(), (1.22364).toFixed()); // 1.22364, 1

  console.log('toFixed 2 >>>', num1.toFixed(2)); // 1.22
  console.log('toFixed 3 >>>', num1.toFixed(3)); // 1.24
}
