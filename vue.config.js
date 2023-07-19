const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target: 'http://121.41.73.253:8081/', //接口域名
        changeOrigin:true, //支持跨域
        rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
      }
    }
  }
})
