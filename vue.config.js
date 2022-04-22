const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://15.164.253.208:7777'
      }
    }
  },
  transpileDependencies: ['vuetify']
})
