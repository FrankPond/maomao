import Vue from 'vue'
import App from './App.vue'
//命名成index.js可以省去一层引用（默认引用index）
import router from './routers'
import store from './stores'

//在main中引入axios后，别的地方就不用引了
import axios from 'axios'
//别的地方可用this.axios调用
Vue.prototype.axios = axios;

//引入echarts.js
import echarts from 'echarts'
Vue.prototype.echarts = echarts;

//图片查看插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview);

//全局过滤器
Vue.filter('setWH',(url , arg)=>{
    return url.replace(/w\.h/,arg);
});

//全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading);

import Loop from '@/components/Loop'
Vue.component('Loop',Loop);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
