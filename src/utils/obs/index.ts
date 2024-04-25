/**
 * 获取当前url中的域名+pathname
 */
export function getDomainAndPathnameUrl(url: string) {
  const { origin, pathname } = new URL(url);
  return origin + pathname;
}
