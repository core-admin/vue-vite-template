/**
 * Hexadecimal to RGB
 * @example
 * hexToRgb('#27ae60ff'); // 'rgba(39, 174, 96, 255)'
 * hexToRgb('27ae60'); // 'rgb(39, 174, 96)'
 * hexToRgb('#fff'); // 'rgb(255, 255, 255)'
 */
export function hexToRgb(hex: string) {
  let alpha = false;
  let h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map(x => x + x).join('');
  } else if (h.length === 8) {
    alpha = true;
  }
  const num = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    ((num >>> (alpha ? 24 : 16)) & 0xff) +
    ', ' +
    ((num & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((num & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${num & 0x000000ff}` : '') +
    ')'
  );
}

/**
 * RGB 转十六进制
 */
export function rgbToHex(r: number, g: number, b: number, prefix = false) {
  const hex = ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
  return `${prefix ? '#' : ''}${hex}`;
}

/**
 * 将16进制颜色转换为rgba
 */
export function hexToRgba(hex: string, alpha = 1) {
  if (hex.charAt(0) === '#') {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(function (char) {
        return char + char;
      })
      .join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * RGB 转 HSL，所有输入参数的范围预计为 [0, 255]
 * @example
 * rgbToHsl(45, 23, 11); // [21.17647, 60.71428, 10.98039]
 */
export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = h;
  const l = h;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l] as const;
}

/**
 * HSL 转 RGB。
 * 输入参数的预期范围为 H: [0, 360]、S: [0, 100]、L: [0, 100]，而所有输出值的范围为 [0, 255]。
 * @example
 * hslToRgb(13, 100, 11); // [56.1, 12.155, 0]
 */
export function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)] as const;
}

/**
 * RGB 至 HSB。
 * 所有输入参数的范围为 [0, 255]，结果值的范围为 H: [0, 360]、S: [0, 100]、B: [0, 100]。
 * @example
 * rgbToHsb(252, 111, 48); // [18.529411764705856, 80.95238095238095, 98.82352941176471]
 */
export function rgbToHsb(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b);
  const n = v - Math.min(r, g, b);
  const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100] as const;
}

/**
 * HSB 转 RGB。
 * 输入参数的范围为 H: [0, 360]、S: [0, 100]、B: [0, 100]，而所有输出值的范围为 [0, 255]。
 * @example
 * hsbToRgb(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]
 */
export function hsbToRgb(h: number, s: number, b: number) {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)] as const;
}

/**
 * HSL 至 HSB。
 * 所有输入参数的范围为 H: [0, 360], S: [0, 100], L: [0, 100]，所有输出值的范围为 H: [0, 360], S: [ 0, 100]，B：[0, 100]。
 * @example
 * slToHsb(13, 100, 11); // [13, 100, 22]
 */
export function hslToHsb(h: number, s: number, l: number) {
  const b = l + (s / 100) * Math.min(l, 100 - l);
  s = b === 0 ? 0 : 2 * (1 - l / b) * 100;
  return [h, s, b] as const;
}

/**
 * HSB 至 HSL。
 * 输入参数的范围为 H: [0, 360], S: [0, 100], B: [0, 100]，所有输出值的范围为 H: [0, 360], S: [ 0, 100]，L: [0, 100]。
 */
export function hsbToHsl(h: number, s: number, b: number) {
  const l = (b / 100) * (100 - s / 2);
  s = l === 0 || l === 1 ? 0 : ((b - l) / Math.min(l, 100 - l)) * 100;
  return [h, s, l] as const;
}

/**
 * 随机颜色
 */
export function randomHexColorCode() {
  return '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}

/**
 * 更改颜色亮度
 * @param delta 亮度变化量，范围为 -100 到 100
 * @param hslStr HSL 颜色字符串
 * @example
 * changeLightness(10, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 60%)'
 * changeLightness(-10, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 40%)'
 * changeLightness(-100, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 0%)'
 * changeLightness(100, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 100%)'
 */
export function changeLightness(delta: number, hslStr: string) {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g)!.map(Number);
  const newLightness = Math.max(0, Math.min(100, lightness + delta));
  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
}
