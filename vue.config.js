const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: config => {
    // Copy data directory into build
    // copy-webpack-plugin is a dependency of Vue Cli
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: resolve('data'),
          ignore: ['.*'],
          to: 'data'
        }
      ])
    )
  }
}
