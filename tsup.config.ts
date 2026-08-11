import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: true,
  outDir: 'dist',
  external: ['@builder.io/qwik', 'echarts'],
  platform: 'browser',
  jsx: 'automatic',
  esbuildOptions(options) {
    options.jsxImportSource = '@builder.io/qwik';
  },
});
