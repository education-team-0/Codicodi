<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view v-wechat-title='$route.meta.title'/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Cookies from 'vue-cookies'
import jwt from 'jwt-decode';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created(){   /*在根组件进行判断，否则刷新就没了*/
    if (Cookies.get('Token')){
      const decoded = jwt(Cookies.get('Token'));
      /*存储至vuex*/
      this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
      this.$store.dispatch("setUser",decoded)
    }
  },
  methods: {
    isEmpty(value){
      return(
          value ===undefined || value ===null ||
          (typeof  value === "object" && Object.keys(value).length ===0) ||
          (typeof value ==="string" && value.trim().length ===0)
      );
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
