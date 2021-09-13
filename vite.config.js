import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/shacl-form.js',
      formats: ['es']
    }
  }
})
