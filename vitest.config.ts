import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ["**/*test.{ts,tsx}"],
    // setupFiles: './src/__tests__/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
});
