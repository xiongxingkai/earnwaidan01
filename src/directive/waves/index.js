import waves from './waves'
// 波纹效果指令
const install = function(Vue) {
  Vue.directive('waves', waves)
}

if (window.Vue) {
  window.waves = waves
  Vue.use(install)
}

waves.install = install
export default waves
