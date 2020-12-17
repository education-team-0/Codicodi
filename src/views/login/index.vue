<template>
  <div class="main-container">
    <el-row>
      <el-col :span=10 :offset=3>
        <carousel></carousel>
      </el-col>
      <el-col :offset=2 :span=5>
        <login></login>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import carousel from "@/views/login/components/carousel";
import login from "@/views/login/components/login";
export default {
  name: 'Login',
  components: {carousel,login},
  data() {
    return{

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