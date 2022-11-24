import { configDefaults, defineConfig } from 'vitest/config'
import filterConsole from './utils/filterConsoleUtils';
const disableFilter = filterConsole(['MODULE_NOT_FOUND']);

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    globalSetup: './config/vitest.setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html', 'cobertura'],
      exclude: ['**/.pnp.*'],
      
    },
    exclude: [...configDefaults.exclude, '**/.pnp.*'],
  },
})