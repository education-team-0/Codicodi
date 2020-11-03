/**
 * axios请求配置
 */
import axios from 'axios'
import { Loading } from 'element-ui';   /*elementUI的loading*/
import { Message } from 'element-ui';   /*elementUI消息提醒*/
import router from '../router/index'
import Cookies from 'vue-cookies'

let loading;
function startLoading () {
    loading = Loading.service({    /*在需要调用时：*/
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0,7)'
    });
}

function endLoading () {
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    startLoading();
    /*判断token存在   登录拦截*/
    if(Cookies.get('Token')){
        /*设置统一的header*/
        config.headers.Authorization  = Cookies.get('Token');
    }
    return config;
},error => {
    return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(Response => {
    //结束加载动画
    endLoading();
    return Response;
},error => {
    //错误提醒
    endLoading();
    Message.error(error.response.data);

    /*获取错误状态码*/
    const  { status } =error.response;
    if(status == 401){
        Message.error("token失效，重新登录");
        /*清楚token*/
        Cookies.remove('Token')
        /*跳转登录*/
        router.push('/')
    }

    return Promise.reject(error);
})




export default axios;