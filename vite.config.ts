import path from 'path';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';
import { viteEjsPlugin } from './build/vite/ejs-plugin';
import { unpluginIconsPlugin } from './build/vite/icon-plugin';
import { ceateProxy } from './build/vite/proxy';

function resolve(url = '', ...args: string[]) {
  return path.resolve(__dirname, url, ...args);
}

export default defineConfig(async (configEnv: ConfigEnv) => {
  const { mode, command } = configEnv;
  const root = process.cwd();
  const env = loadEnv(mode, root) as unknown as ViteEnv;
  const { Icons, IconsResolver } = unpluginIconsPlugin();
  return {
    server: {
      port: 9000,
      host: true,
      open: false,
      strictPort: true,
      proxy: ceateProxy(configEnv, env) || undefined,
    },
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.ENV_MODE': JSON.stringify(mode),
    },
    css: {
      devSourcemap: command === 'serve',
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import '@/styles/common/var/var.less';`,
        },
      },
    },
    plugins: [
      vue({
        script: {
          propsDestructure: true,
        },
      }),
      vueJsx(),
      Components({
        dts: resolve('./typings/autoimport-components.d.ts'),
        resolvers: [IconsResolver()],
      }),
      Icons(),
      svgLoader({
        svgo: false,
        defaultImport: 'url',
      }),
      viteEjsPlugin(configEnv, env),
    ],
    optimizeDeps: {
      include: ['tj-design-vue'],
    },
    build: {
      rollupOptions: {
        external: [
          // NOTE - 打包时排除 examples 目录
          resolve(__dirname, './examples'),
        ],
      },
    },
  };
});
