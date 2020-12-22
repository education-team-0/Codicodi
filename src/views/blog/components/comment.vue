<template>
  <div class="comment">
    <el-card shadow="never">
      <el-input
          type="textarea"
          maxlength="100"
          show-word-limit
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea"
          class="inputArea">
      </el-input>

      <el-row style="margin-top: 15px">
        <el-col :span="6">
          <el-input
              placeholder="Username"
              v-model="username">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-input
              placeholder="Email"
              v-model="email"
              style="margin-left: 10px">
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-col>
        <el-col :span="5" style="margin-left: 20px">
          <el-button type="primary" icon="el-icon-edit-outline">发布</el-button>

        </el-col>
      </el-row>



    </el-card>


  </div>


</template>

<script>
export default {
  name: "comment",
  data(){
    return{
      textarea:'',
      username:'',
      email:''
    }
  }
}
</script>

<style scoped>
/*.inputArea{*/
/*  height: 150px;*/
/*}*/

</style>