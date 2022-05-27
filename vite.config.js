import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   post:"0.0.0.0",
  //   port: '3000',//端口号
  //   // https: "true",
  //   cros:true,
  //   proxy: { // 本地开发环境通过代理实现跨域
  //     // 正则表达式写法
     
  //     '': {
  //       target: '', // 后端服务实际地址
  //       changeOrigin: true, //开启代理
  //       secure: false,  
  //       rewrite: path => path.replace(/^\/api/, '')
  //     }
  //   }
  // },

})
