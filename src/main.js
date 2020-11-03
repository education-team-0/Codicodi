import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import VueWechatTitle from 'vue-wechat-title';
import Cookies from 'vue-cookies'
import store from "@/util/store";
import axios from '@/util/http'

Vue.use(VueWechatTitle)
Vue.config.productionTip = false
Vue.use(router)
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.use(Vuex)
Vue.use(Cookies)
Vue.use(store)

//设置axios请求后端接口的前缀url
axios.defaults.baseURL='http://localhost:8083'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
