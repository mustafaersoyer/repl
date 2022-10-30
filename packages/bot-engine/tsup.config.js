import { defineConfig } from 'baptistearno-tsup'

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  sourcemap: true,
  minify: !options.watch,
  dts: true,
  format: ['esm', 'cjs'],
  loader: {
    '.css': 'text',
  },
}))
