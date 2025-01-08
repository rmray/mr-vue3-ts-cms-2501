import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import dotenv from 'dotenv'

// https://vite.dev/config/
export default ({ mode }: any) => {
  // 导入环境变量配置文件：.env.xxx
  dotenv.config({ path: `.env.${mode}` })

  // 返回配置项
  return defineConfig({
    plugins: [
      vue(),

      // 按需导入 element-plus
      AutoImport({
        resolvers: [ElementPlusResolver()]
        // dts: true,
      }),
      Components({
        resolvers: [ElementPlusResolver()]
        // dts: true,
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    // 路由前缀
    base: process.env.VITE_BASE
  })
}
