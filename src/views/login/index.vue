<template>
  <div class="main-container">
    <el-row>
      <el-col span=10 offset=3>
        <carousel></carousel>
      </el-col>
      <el-col offset=2 span=5>
        <login></login>
      </el-col>
      <el-row>
        <el-col span=8>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>




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