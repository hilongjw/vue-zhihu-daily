// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'server/public/index.html'),
    admin: path.resolve(__dirname, 'server/public/admin.html'),
    assetsRoot: path.resolve(__dirname, 'server/public'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false
  },
  dev: {
    port: 8080,
    proxyTable: {}
  }
}
