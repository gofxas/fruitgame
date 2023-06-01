
import { defineConfig  } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'
import autoprefixer from 'autoprefixer'
import pwaConfig from './pwa.config'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  // www-lc.drugv.com
  server: {
    host:'0.0.0.0',
    port: 9090,
    proxy: {
    }
  },
  plugins: [
    vue(), 
    vueJsx(),
    VitePWA(pwaConfig),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` },
      { find: /^~/, replacement: '' }
    ],
    extensions: ['.js', '.mjs', '.vue', '.json', '.less', '.css']
  },
  define: { 'process.env': {} },
  css: {
    postcss: {
      plugins: [
        autoprefixer
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled:true
      }
    }
  },
  dev:{
    rollupOptions:{
      input: {
        index: path.resolve(__dirname, 'index.html')
     }
    },
  },
  build:{
    rollupOptions:{
      input: {
        index: path.resolve(__dirname, 'index.html')
     }
    },
    minify: "terser", 
    terserOptions: { 
      compress: { 
        pure_funcs:command === "build"?['console.log']:null,
        // drop_console: command === "build", 
        drop_debugger: command === "build" 
      } 
    }
  }
}))
