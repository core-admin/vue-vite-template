export function isEmailValid(address: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
}

/**
 * 验证用户终端输入是否Y/N
 * @param val 用户输入
 * @param def 默认值，当预期答案与用户输入不匹配时，使用的默认值
 * @example Are you sure you want to continue? [y/n]
 * yesNo('Y'); // true
 * yesNo('yes'); // true
 * yesNo('No'); // false
 * yesNo('Foo', true); // true
 */
export function yesNo(val: string, def: boolean = false) {
  return /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;
}

/**
 * 验证是否是中文名
 */
export function isChineseName(str: string) {
  return /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(str);
}

/**
 * 验证是否是二代身份证号（2代,18位数字），最后一位是校验位，可能为数字或字符X
 */
export function isIDCardNew(str: string) {
  return /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(str);
}

/**
 * 验证是否是身份证号，支持一代和二代身份证号（15/18位）
 */
/**
@param { string } value
*/
export function isIDCard(str: string) {
  return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(
    str,
  );
}
