import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import Axios from 'axios'
import VueWechatTitle from 'vue-wechat-title';

Vue.use(VueWechatTitle)
Vue.config.productionTip = false
Vue.use(router)
Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.use(Vuex)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
