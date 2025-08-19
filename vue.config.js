const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      // '/api': {
      //   target: 'http://127.0.0.1:5000',
      // },
      // '/page-image': {
      //   target: 'http://127.0.0.1:5000',
      // },
    },
  },

  // build: {
  //   outDir: 'dist',
  //   sourcemap: true
  // }
})
