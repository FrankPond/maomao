import Vue from 'vue'
import App from './App.vue'
//命名成index.js可以省去一层引用（默认引用index）
import router from './routers'
import store from './stores'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
