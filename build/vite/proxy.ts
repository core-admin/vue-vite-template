import { ConfigEnv, ProxyOptions } from 'vite';

export function ceateProxy(configEnv: ConfigEnv, env: ViteEnv) {
  if (configEnv.command === 'build') {
    return;
  }

  const proxyList: Array<{
    key: string;
    value: ProxyOptions;
  }> = [];

  const { VITE_DEFAULT_REQUEST_URL, VITE_DEFAULT_REQUEST_URL_PROXY_PREFIX } = env;

  if (VITE_DEFAULT_REQUEST_URL_PROXY_PREFIX) {
    proxyList.push({
      key: VITE_DEFAULT_REQUEST_URL_PROXY_PREFIX,
      value: {
        target: VITE_DEFAULT_REQUEST_URL,
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(new RegExp(`^${VITE_DEFAULT_REQUEST_URL_PROXY_PREFIX}`), ''),
      },
    });
  }

  // 如果有新的代理需要在下面添加

  // ------------------- 新的代理配置 start -------------------

  // ------------------- 新的代理配置 end -------------------

  const proxyData: Record<string, ProxyOptions> = {};

  if (proxyList.length) {
    proxyList.forEach(item => {
      proxyData[item.key] = item.value;
    });
  }

  return Object.keys(proxyData).length ? proxyData : undefined;
}
