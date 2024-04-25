import { ConfigEnv } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export function viteEjsPlugin(configEnv: ConfigEnv, env: ViteEnv) {
  const { command, mode } = configEnv;
  const { VITE_HUAWEI_SITE_MONITOR_APPID } = env;
  return ViteEjsPlugin({
    command,
    mode,
    /**
     * 注入华为云前端站点监控
     */
    InjectHuaweiSiteMonitorTemplate:
      command === 'build' &&
      VITE_HUAWEI_SITE_MONITOR_APPID != null &&
      VITE_HUAWEI_SITE_MONITOR_APPID !== ''
        ? `<script>!function (x, n) { window[n] = window[n] || {}; window[n].config = { appId: '${VITE_HUAWEI_SITE_MONITOR_APPID}', apiRepo: true, thirdApi: true, hashMode: true, smartJsErr: true, JsErrClean: true, webResource: true, }; var o = document.createElement('script'); o.src = x, o.async = !0; var d = document.body.firstChild; document.body.insertBefore(o, d); }('https://res.hc-cdn.com/js-agent/1.0.36/jsagent.min.js', '__fr');</script>`
        : '',
  });
}
