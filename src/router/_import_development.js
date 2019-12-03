const vueFileString = process.env.vueFileString
module.exports = file => {
  if (file && vueFileString.indexOf(file + '.vue') > -1) {
    return require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
  } else {
    return require('@/views/errorPage/404.vue').default
  }
}
