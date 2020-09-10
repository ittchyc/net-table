// vue.config.js

module.exports = {
  publicPath: './',
  configureWebpack:{
    externals: {
      'vue': 'Vue',
      'moment': 'moment',
      'element-ui': 'ELEMENT'
    }
  }
}