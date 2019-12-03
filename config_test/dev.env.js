'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// 以下为修改内容部分
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"'
}
// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })
