import path from 'path';
import fsp from 'fs/promises';
import iconsResolver from 'unplugin-icons/resolver';
import iconsPlugin from 'unplugin-icons/vite';
import { SVG, cleanupSVG, runSVGO } from '@iconify/tools';

function resolve(url: string, ...args: string[]) {
  return path.resolve(process.cwd(), url, ...args);
}

/**
 * https://github.com/unplugin/unplugin-icons/issues/72
 * https://github.com/unplugin/unplugin-vue-components/issues/11
 *
 * import xxx from '~icons/fill-svg/xxx';
 * import xxx2 from '~icons/svg/xxx';
 */
export function unpluginIconsPlugin() {
  const baseIconsPath = './src/assets/icons';
  const svgPath = resolve(baseIconsPath, './svg');
  const fillSvgPath = resolve(baseIconsPath, './fill-svg');
  return {
    IconsResolver: () =>
      iconsResolver({
        prefix: 'icon',
        customCollections: ['svg', 'fill-svg'],
      }),
    Icons: () =>
      iconsPlugin({
        compiler: 'vue3',
        autoInstall: false,
        // 自定义图标加载
        customCollections: {
          svg: async name => {
            const filename = `${svgPath}/${name}.svg`;
            const content = await fsp.readFile(filename, 'utf-8');
            const svg = new SVG(content);
            await cleanupSVG(svg);
            runSVGO(svg, {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      convertColors: {
                        currentColor: true,
                      },
                    },
                  },
                },
                {
                  name: 'addClassesToSVGElement',
                  params: {
                    classNames: ['svg-icon'],
                  },
                },
              ],
            });
            return svg.toMinifiedString({ width: '1em', height: '1em' });
          },
          'fill-svg': async name => {
            const filename = `${fillSvgPath}/${name}.svg`;
            const content = await fsp.readFile(filename, 'utf-8');
            const svg = new SVG(content);
            await cleanupSVG(svg);
            runSVGO(svg, {
              plugins: [
                { name: 'preset-default' },
                {
                  name: 'addClassesToSVGElement',
                  params: {
                    classNames: ['svg-icon'],
                  },
                },
              ],
            });
            return svg.toMinifiedString({ width: '1em', height: '1em' });
          },
        },
      }),
  };
}
