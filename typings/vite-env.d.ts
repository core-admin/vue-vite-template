// eslint-disable-next-line spaced-comment
// /// <reference types="vite/client" />
// eslint-disable-next-line spaced-comment
// eslint-disable-next-line spaced-comment
// /// <reference types="vite-svg-loader" />

// ------------------
// ------vite--------
// ------------------
declare interface ViteEnv {
  // 项目名称标题
  readonly VITE_APP_TITLE?: string;

  // 默认请求地址
  readonly VITE_DEFAULT_REQUEST_URL: string;
  // 默认请求地址-请求前缀
  readonly VITE_DEFAULT_REQUEST_URL_PREFIX?: string;
  // 默认请求地址-代理前缀
  readonly VITE_DEFAULT_REQUEST_URL_PROXY_PREFIX?: string;

  // 华为云oss默认桶名
  readonly VITE_OBS_DEFAULT_BUCKET_NAME: string;
  // web365文件预览服务地址
  readonly VITE_OFFICE_WEB_365_URL?: string;
  // 华为云站点监控 appid
  readonly VITE_HUAWEI_SITE_MONITOR_APPID?: string;
  readonly MODE: 'development' | 'test' | 'preview' | 'production';
}
