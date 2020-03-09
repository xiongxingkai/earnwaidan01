/*
vue-router三种模式 mode: hash  | history  | abstract



1.hash(实现原理 监听onhashchange事件)
document.body.onhashchange = e => {console.log(777, e)}
document.body.addEventerListener('hashchange', e => {console.log(777, e))
window.onhashchange = e => {console.log(777, e)}
window.addEventerListener('hashchange', e => {console.log(777, e))



2.history (实现原理： 监听 onpopstate事件)
window.onpopstate = e => {console.log(777, e)}
window.addEventerListener('popstate', e => {console.log(777, e))
*/