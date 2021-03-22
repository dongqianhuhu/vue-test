const plugins = []
if (process.env.VUE_APP_CONFIG === 'online') {
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }]
  ],
  plugins: plugins
}
