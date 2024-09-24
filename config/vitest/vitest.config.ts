import { configDefaults, defineConfig } from 'vitest/config'
import filterConsole from '../utils/filterConsoleUtils';
const disableFilter = filterConsole(['MODULE_NOT_FOUND']);

export default defineConfig({
  test: {
    globals: true,
    watch: false,

    globalSetup: './config/vitest/vitest.setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html', 'cobertura'],
      exclude: [
        '**/.pnp.*',
        '**/.history/**',
        '**/.yarn/**',
        '**/coverage/**',
        '**/lib/**',
        '**/app/**',
        '**/config/**',
      ],
    },
    exclude: [...configDefaults.exclude, '**/.pnp.*'],
  },
})