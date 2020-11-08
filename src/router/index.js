import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'vue-cookies'

/**
 * 导入组件
 */


Vue.use(Router)

const router=new Router({
    mode:'hash',
    routes: [
        {
            path:'/',
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
        },

        {
            path:'/blog/editor',
            component:()=>import("@/views/blog/index"),
            meta:{
                title:'editor'
            }
        },
        {
            path: '/blog/list',
            component: () => import('@/views/blog/list'),
            meta: {
                title: 'list'
            }
        },
        {
            path: '/blog/edit/:id(\\d+)',
            component: () => import('@/views/blog/index'),
            name: 'EditArticle',
            meta: { title: 'Edit Article', noCache: true,},
            hidden: true
        },


        // {
        //     path:'/blog',
        //     // component: () => import('@/views/blog/list'),
        //     redirect: '/blog/list',
        //     meta:{
        //         title:'list'
        //     },
        //     children:[
        //         {
        //             path: 'edit/:id(\\d+)',
        //             component: () => import('@/views/blog/index'),
        //             name: 'EditArticle',
        //             meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        //             hidden: true
        //         },
        //         {
        //             path: 'list',
        //             component: () => import('@/views/blog/list'),
        //             name: 'ArticleList',
        //             meta: { title: 'Article List'}
        //         },
        //         {
        //             path:'editor',
        //             component:()=>import("@/views/blog/index"),
        //             meta:{
        //                 title:'editor'
        //             }
        //         },
        //     ]
        // },
    ]

})

/*路由守卫   根据登录获得token*/
// router.beforeEach((to,from,next) =>{
//     const isLogin = Cookies.get('Token') ? true :false ;
//     if(to.path ==="/" || to.path ==="/login" || to.path==="/blog/editor"){
//         next();
//     }else{
//         isLogin ? next() :next("/")   /*真跳转  假注册*/
//     }
// })


export default router
