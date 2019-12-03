import Clipboard from './clipboard'
// 剪贴板指令
const install = function(Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  Vue.use(install)
}

Clipboard.install = install
export default Clipboard