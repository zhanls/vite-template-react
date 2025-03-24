import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  // 配置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
