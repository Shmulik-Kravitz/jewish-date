import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    watch: false,

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
