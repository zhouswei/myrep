// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import i18n from './lang'
import './icons' // icon
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
// import './styles/index.scss'
import './permission'
import './mock' // simulation data
import './utils/directives.js'
import * as filters from './filters' // global filters
import VcPopupPressMenu from 'vc-popup-press-menu'
// import Print from 'vue-print-nb'
import Print from '@/utils/print'
import VueClipboard from 'vue-clipboard2'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'TvZ07OPGzT3njkXOIxSTzNshuPfWQfck'
})
Vue.use(VueClipboard)
Vue.use(Print)
// 这里名字可以随意
Vue.use(VcPopupPressMenu)
// Vue.use(Print)
Vue.use(ElementUI, {size: 'medium', i18n: (key, value) => i18n.t(key, value)})
Vue.config.productionTip = false
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
// browser
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
// mobile
// document.addEventListener('deviceready', function () {
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     i18n,
//     template: '<App/>',
//     components: { App } })
//   window.navigator.splashscreen.hide()
// }, false)
