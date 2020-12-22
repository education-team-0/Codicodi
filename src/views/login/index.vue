<template>
  <div class="main-container">
<!--    <github-corner class="github-corner"></github-corner>-->
    <el-row>
      <el-col :span=10 :offset=3>
        <carousel></carousel>
      </el-col>
      <el-col :offset=2 :span=5>
        <login></login>
      </el-col>

    </el-row>

<!--    <el-row>-->
<!--      <el-tag :type="randomColor" v-for="type in typeList" :key="type">{{type}}</el-tag>-->
<!--    </el-row>-->

  </div>
</template>

<script>
import carousel from "@/views/login/components/carousel";
import login from "@/views/login/components/login";
import GithubCorner from "@/components/GithubCorner";
export default {
  name: 'Login',
  components: {GithubCorner, carousel,login},
  data() {
    return{
      typeList:[1,2,3,4]

    }
  },
  methods:{
    randomColor(){
      return "success"
    }
  }
}
</script>

<style>
.main-container{

  /*background-color: #2c3e50;*/
}

/*.el-input__inner {*/
/*  background-color: #f56c6c;*/
/*}*/



</style>