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
import qs from 'querystring'
import '@/assets/css/public.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueVideoPlayer from "vue-video-player/src";
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import  {vueBaberrage}  from 'vue-baberrage'

Vue.use(vueBaberrage)
Vue.use(VueVideoPlayer)
Vue.use(VueWechatTitle)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$qs=qs
Vue.use(Cookies)
Vue.use(mavonEditor)
//vue codemirror  前端代码编辑
import VueCodemirror from "vue-codemirror";
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror)

Vue.prototype.imgUrl='http://edures.oss-accelerate.aliyuncs.com/'

//设置axios请求后端接口的前缀url

axios.defaults.baseURL='http://localhost:8081'

// axios.defaults.baseURL='http://81.68.205.41:8080'


Vue.prototype.test=new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app1')
