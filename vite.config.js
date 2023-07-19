import { defineConfig } from "vite";
import vue from "@/vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  lintOnSave:false,
  base: "./",
  server:{
    proxy:{
      '/api':{
        target: 'http://121.41.73.253:8000/', //接口域名
        changeOrigin:true, //支持跨域
        rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
      }
    }
  }
});
