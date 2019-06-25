import Vue from 'vue'
import App from './App.vue'
//命名成index.js可以省去一层引用（默认引用index）
import router from './routers'
import store from './stores'

//在main中引入axios后，别的地方就不用引了
import axios from 'axios'
//别的地方可用this.axios调用
Vue.prototype.axios = axios;

//全局过滤器
Vue.filter('setWH',(url , arg)=>{
    return url.replace(/w\.h/,arg);
});

//全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
