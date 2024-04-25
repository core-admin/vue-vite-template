import { name, version } from '../../package.json';
import { snakeCase } from 'lodash-es';

export function getEnv(): ViteEnv {
  return import.meta.env as unknown as ViteEnv;
}

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

export function isProdMode(): boolean {
  return import.meta.env.PROD;
}

export function getCurrentEnvMode(): ViteEnv['MODE'] {
  return import.meta.env.MODE as ViteEnv['MODE'];
}

// 公共的缓存前缀
export function getCommonStoragePrefix() {
  return `${snakeCase(name)}__${getCurrentEnvMode()}`.toUpperCase();
}

// 本地缓存使用的键名
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${version}`}__`.toUpperCase();
}

/**
 * 业务缓存使用的键名
 */
export function businesseStorageShortName(key: string) {
  return `${getCommonStoragePrefix()}__${key}`;
}
