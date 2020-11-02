import Vue from 'vue'
import Router from 'vue-router'

/**
 * 导入组件
 */


Vue.use(Router)

const router=new Router({
    mode:'hash',
    routes: [
        {
            path:'/login',
            component:()=>import("@/views/login/index"),
            meta:{
                title:'login'
            }
        },
        {
            path:'/test',
            component:()=>import("@/views/test/hello"),
            meta:{
                title:'hello'
            }
        }
    ]

})


export default router
