const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  output: {
    filename: '[name]_[hash].js',
    chunkFilename: '[name]_[hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  }
}
