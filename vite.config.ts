import * as path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'CanvasAnimations',
      formats: ['es', 'umd'],
      fileName: (format) => `canvas-animations.${format}.js`,
    },
  },
  worker: {
    format: 'iife',
  },
});
