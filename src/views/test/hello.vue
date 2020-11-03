<template>
  <div>
    <h1>hello</h1>
    <el-row>
      <el-col offset=2 span=4>
        <el-row>
          <el-button type="primary"  @click="hello" >hello</el-button>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-button type="primary"  @click="UserLoginTokenClick" >UserLoginToken</el-button>
        </el-row>
        <el-divider></el-divider>
       <el-row>
         <el-button type="primary"  @click="passtokenClick" >passtoken</el-button>
       </el-row>


      </el-col>

      <el-col offset=2 span="15">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>接口调用结果</span>

          </div>
          <div>
            {{message}}
          </div>

        </el-card>

      </el-col>



    </el-row>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'test',
  data() {
    return {
      message: '接口内容'
    }

  },
  methods: {
    hello(){
      var url='/hello'
      axios.get(url)
          .then(
              response=>{
                this.message=response.data;
              }
          )
    },
    UserLoginTokenClick() {
      var url='/user/logintoken'
      //var url = 'http://81.68.205.41:8082/user/logintoken'
      axios.get(url)
          .then(
              response => {
                this.message = response.data;
              }
          )
    },
    passtokenClick() {
      var url = '/user/passtoken'
      //var url='http://81.68.205.41:8082/user/find/all'
      axios.get(url)
          .then(
              response => {
                this.message = response.data;
              }
          )
    },
  }
}
</script>

<style>

</style>