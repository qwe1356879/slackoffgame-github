import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  build:{
    outDir:"dist",
    assetsDir:"assets",
    sourcemap:false,
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 这里假设你的源代码目录是 'src'
    }
  },
  plugins: [vue()],
 
})


