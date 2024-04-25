import { isClient } from './is';

export function isFirefox() {
  return isClient && /firefox/i.test(window.navigator.userAgent);
}
