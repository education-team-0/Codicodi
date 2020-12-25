<template>
  <div :style="{minWidth:minWidth+'px'}">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="header" v-if="showNavigateBar">
      <div style="font-size: 16px;">
        <span style="font-size: 28px;">朝哥云课堂</span>
        <SelectSpan itemBgColor="black" itemHoverColor="grey"
                    :items="courseType"
        >课程分类<i class="el-icon-arrow-down"></i></SelectSpan>
        <span @click="showUpload=true">上传视频</span>
        <span @click="$router.push({
        path: '/blog/editor'
        })"><i class="el-icon-present">发布博客</i></span>
      </div>
      <div style="font-size: 14px;position: relative">
        <span @click="$router.push({path:'/blog/index'})">博客列表</span>
        <div class="input">
          <input v-model="value" aria-placeholder="搜索课程"/>
        </div>
        <i class="el-icon-search inputSuffix" @click="search"></i>
      </div>
      <div style="font-size: 14px">
        <span @click="$router.push({
         path: '/blog/list',
        })">博客管理</span>
        <el-badge :value="12">
          <span style="font-size: 17px"><i class="el-icon-bell"></i></span>
        </el-badge>
        <span style="font-size: 17px;margin-left: 30px"><i class="el-icon-shopping-cart-2"></i></span>
        <span style="align-self: stretch;background-color: white;width: 1px"></span>
        <span>郑建宙</span>
        <span> <el-avatar :src="imgUrl+'userAvatar/hello.png'"></el-avatar></span>
      </div>
    </div>
    <github-corner></github-corner>
    <router-view v-wechat-title='$route.meta.title'/>

    <div class="navigateTop" :style="{visibility:naviTopVisibility}" @click="toTop">
      <i class="el-icon-caret-top"></i>
    </div>
    <upload-video v-if="showUpload" @closeUpload="showUpload=false"></upload-video>
  </div>
</template>

<script>
import Cookies from 'vue-cookies'
import jwt from 'jwt-decode'
import SelectSpan from "@/components/SelectSpan";
import uploadVideo from "@/components/uploadVideo";
import courseType from "@/data/courseType";
import GithubCorner from "@/components/GithubCorner";
export default {
  name: 'App',
  data(){
    let wh=document.documentElement.clientHeight
    let ww=document.documentElement.clientWidth
    window.sessionStorage.wh=wh
    window.sessionStorage.ww=ww
    let minWidth=document.body.clientWidth*0.9
    return{
      navBarFilter:['courseVideo'],
      courseType: courseType.data,
      value: '',
      minWidth:minWidth,
      naviTopVisibility:'hidden',
      showUpload:false
    }
  },
  computed:{
    //在此数组中的组件不含有navigateBar
    showNavigateBar(){
      return  !(this.navBarFilter.indexOf(this.$route.name)>-1)
    }
  },
  components: {
    GithubCorner,
    SelectSpan,
    uploadVideo
  },
  created(){   /*在根组件进行判断，否则刷新就没了*/
    if (Cookies.get('Token')){
      const decoded = jwt(Cookies.get('Token'));
      /*存储至vuex*/
      this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
      this.$store.dispatch("setUser",decoded)
    }
    window.onscroll=this.debounce()

    this.$axios.post('/login',JSON.stringify({
      id:'test',
      pw:'123456'
    }),{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      console.log(res)
    })

  },
  mounted() {
    console.log('mounted')
  },
  methods: {
    search(){

    },
    toTop(){
      window.scrollTo(0,0)
    },
    showNavigateTop(){
      let height=document.documentElement.scrollTop
      if(height>100)
        this.naviTopVisibility='visible'
      else
        this.naviTopVisibility='hidden'
    },

    debounce(){
      //js闭包
      let timer=null
      return ()=>{
        if(timer)
          clearTimeout(timer)
        timer=setTimeout(this.showNavigateTop,500)
      }
    },
    isEmpty(value){
      return(
          value ===undefined || value ===null ||
          (typeof  value === "object" && Object.keys(value).length ===0) ||
          (typeof value ==="string" && value.trim().length ===0)
      );
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
.github-corner {
  position: absolute;
  top: 0px;
  border: 0;
  right: 0;
}
</style>
<style scoped>
.header {
  color: white;
  text-align: center;
  background-color: black;
  display: flex;
  justify-content: space-evenly;
  padding: 11px 0;
}
.input{
  margin: 5px 0;
  background-color: #4c4646;
  align-self: stretch;
  padding: 10px;
  border-radius: 23px/20px;
}
.inputSuffix{
  position: absolute;
  right: 15px;
}
.inputSuffix:hover{
  color: #c8c9cc;
  cursor: pointer;
}
.input>input{
  background-color: #4c4646;
  position: relative;
  border: none;
  color: white;
  height: 100%;
  font-size: 1.1em;
}
.header > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header span {
  margin: 0 20px;
}
.header span:hover{
  color: #9d9797;
  cursor: pointer;
}
.navigateTop{
  width: 20px;
  height: 20px;
  font-size: 1em;
  text-align: center;
  line-height: 20px;
  position: fixed;
  padding: 10px;
  z-index: 1;
  right: 5%;
  bottom: 5%;
  border-radius: 20px;
  background-color: gold;
  transition: visibility 0.5s;

}
.navigateTop:hover{
  box-shadow: 0 0 10px gray;
}
</style>
