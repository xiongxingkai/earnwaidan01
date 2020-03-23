
'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 以下是新增文件目录处理函数
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 以下为修改内容部分
const env = require('../config/'+process.env.env_config+'.env')
env.vueFileString = utils.getVueFileString('views')

// const env = process.env.NODE_ENV === 'testing'
//   ? require('../config/test.env')
//   : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: false, // 该行为修改行
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // 以下是修改内容部分
      filename: config.build.index,
      // filename: process.env.NODE_ENV === 'testing'
      //   ? 'index.html'
      //   : config.build.index,
      template: 'index.html',
      inject: true,
      // 以下内容为新增部分
      favicon: resolve('favicon.ico'),
      title:'vue-element-admin',
      path: config.build.assetsPublicPath + config.build.assetsSubDirectory,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // this instance extracts shared chunks from code splitted chunks and bundles them 
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chuunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      async: 'admin-async',
      minChunks(module) {
        var context = module.context;
        return context && (/views[/|\\]admin/.test(context));
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'asset-async',
      minChunks(module) {
        var context = module.context;
        return context && (/views[/|\\]asset/.test(context));
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'hr-async',
      minChunks(module) {
        var context = module.context;
        return context && (/views[/|\\]hr/.test(context));
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'office-async',
      minChunks(module) {
        var context = module.context;
        return context && (/views[/|\\]office/.test(context));
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'project-async',
      minChunks(module) {
        var context = module.context;
        return context && (/views[/|\\]project/.test(context));
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'components-async',
      minChunks(module) {
        var context = module.context;
        return context && (/views[/|\\]components/.test(context));
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'common-async',
      minChunks(module) {
        var context = module.context;
        return context && (/src[/|\\](api|store|utils)/.test(context));
      }
    }),
    // split supermap into its own file
    new webpack.optimize.CommonsChunkPlugin({
      async: '@supermap-async',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('@supermap') >= 0);
      }
    }),
    // split leaflet into its own file
    new webpack.optimize.CommonsChunkPlugin({
      async: 'leaflet-async',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('leaflet') >= 0);
      }
    }),
    // split echarts into its own file
    new webpack.optimize.CommonsChunkPlugin({
      async: 'echarts-async',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0);
      }
    }),
    // split xlsx into its own file
    new webpack.optimize.CommonsChunkPlugin({
      async: 'xlsx-async',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('xlsx') >= 0);
      }
    }),
    // split codemirror into its own file
    new webpack.optimize.CommonsChunkPlugin({
      async: 'codemirror-async',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('codemirror') >= 0);
      }
    }),
    // split plupload into its own file
    new webpack.optimize.CommonsChunkPlugin({
      async: 'plupload-async',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('plupload') >= 0);
      }
    }),
    // split lodash into its own file
    new webpack.optimize.CommonsChunkPlugin({
      async: 'lodash-async',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('lodash') >= 0);
      }
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
      // chunks: ["app"]
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // // 以下内容为新增部分
    // // split leaflet into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'leaflet',
    //   minChunks(module){
    //     var context = module.context;
    //     return context && (context.indexOf('leaflet') >= 0);
    //   }
    // }),
    // // split xlsx into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'xlsx',
    //   minChunks(module){
    //     var context = module.context;
    //     return context && (context.indexOf('xlsx') >= 0);
    //   }
    // }),
    // // split codemirror into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'codemirror',
    //   minChunks(module){
    //     var context = module.context;
    //     return context && (context.indexOf('codemirror') >= 0);
    //   }
    // }),
    // // split echarts into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'echarts',
    //   minChunks(module){
    //     var context = module.context;
    //     return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0);
    //   }
    // }),
    // // split supermap into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: '@supermap',
    //   minChunks(module){
    //     var context = module.context;
    //     return context && (context.indexOf('@supermap') >= 0);
    //   }
    // }),
    // // This instance extracts shared chunks from code splitted chunks and bundles them
    // // in a separate chunk, similar to the vendor chunk
    // // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   children: true,
    //   minChunks: 3
    // }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
      // ,{
      //   from: path.resolve(__dirname, '../config/config.js'),
      //   to: config.build.assetsRoot,
      //   ignore: ['.*']
      // }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
