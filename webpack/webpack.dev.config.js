const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const baseWebpackConfig = require('./webpack.base.config')
const host = process.env.HOST || 'localhost'
const port = +process.env.PORT || 3001
const timeout = +process.env.TIMEOUT || 2000

const reactHMR = [
  'react-hot-loader/patch', // 开启 React 代码的模块热替换(HMR)
  `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr&timeout=${timeout}&reload=true`,
  // 为热替换(HMR)打包好代码 only- 意味着只有成功更新运行代码才会执行热替换(HMR)
  'webpack/hot/only-dev-server'
]

baseWebpackConfig.entry.app.push(...reactHMR)

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackIsomorphicToolsPlugin(require('./isomorphic.config.js'))
  ]
})
