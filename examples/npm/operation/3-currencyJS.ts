/* eslint-disable @typescript-eslint/no-unused-vars */
import Big from 'big.js';
import currency from 'currency.js';

{
  const num1 = currency(0.1);
  console.log(num1); // currency object
  console.log(num1.add(0.2)); // currency object

  // currency.js 也可以直接进行数学运算，并且不会出现精度问题
  console.log(num1.add(0.2).value); // 0.3
}

console.log('-------------------');

{
  // 货币格式化
  const res1 = currency('1,999');
  const num = res1.value;
  console.log(num); // 1999
  const res2 = currency(num).format();
  console.log(res2); // $1,999.00
}
