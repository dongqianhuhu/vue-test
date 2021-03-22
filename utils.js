const path = require('path')
const fs = require('fs')
const buildConfig = require('./build/config')

const PAGE_PATH = path.resolve(__dirname, 'src/pages')
const pageDirs = fs.readdirSync(PAGE_PATH)
const page = process.env.npm_config_page || ''

exports.getPages = () => {
  let pages = {}
  pageDirs.forEach((dir) => {
    const filePrefix = `${PAGE_PATH}/${dir}`
    const files = fs.readdirSync(filePrefix)
    let config = {}
    files.forEach((file) => {
      config.template = buildConfig.templateUrl
      if (/js|ts/.test(file)) {
        config.entry = `${filePrefix}/${file}`
        config.title = buildConfig.titleHash[file.slice(0, -3)]
      }
    })
    if (page) {
      if (page === dir) {
        pages[dir] = config
      }
    } else {
      pages[dir] = config
    }
  })

  return pages
}
