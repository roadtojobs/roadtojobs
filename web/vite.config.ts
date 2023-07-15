import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import { version as pkgVersion } from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';

process.env.VITE_APP_VERSION = pkgVersion;
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),
  ],
});
