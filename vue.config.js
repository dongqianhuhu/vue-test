const conf = require('./webpack.config')
const path = require('path')
const util = require('./utils')

let baseUrl = './'
if (process.env.VUE_APP_CONFIG === 'online') {
  baseUrl = ''
}

module.exports = {
  devServer: {
    host: 'localhost',
    port: 3000,
    disableHostCheck: true
  },
  baseUrl: baseUrl,
  configureWebpack: conf,
  pages: util.getPages(),
  productionSourceMap: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('named-chunks')
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/common/theme.less')]
    }
  }
}
