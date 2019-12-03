'use strict'
const fs = require('fs')
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        publicPath: '../../', // 该行为新增行
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass').concat(
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/styles/index.scss')
        }
      }
    ),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

function displayFile(param, files) {
  const stats = fs.statSync(param)
  // 如果是目录的话，遍历目录下的文件信息
  if (stats.isDirectory()) {
    const file = fs.readdirSync(param)
    file.forEach(e => {
      // 遍历之后递归调用查看文件函数
      // 遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
      const absolutePath = path.resolve(path.join(param, e))
      displayFile(absolutePath, files)
    })
  } else {
    if (param.indexOf('.vue') !== -1) {
      files.push(param.replace(path.join(__dirname, '../src/'), '').replace(/\\/g, '/'))
    }
    // 如果不是目录答应文件信息
    console.log(param)
  }
}
exports.getVueFileString = dir => {
  const files = []
  const baseDir = path.join(__dirname, '../src/', dir)
  displayFile(baseDir, files)
  let ret = '"' + files.join(',') + '"'
  console.log(ret)
  return ret
}
