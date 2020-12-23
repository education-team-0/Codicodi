<template>
  <div class="comment">
    <div class="comments">
      <el-card shadow="never">
        <span class="header">评论</span>
        <el-divider class="divider"></el-divider>
        <div v-for="comment in reverseComments" :key="comment.commentId">
          <el-row style="margin-top: 10px">
            <el-col :span="2">
              <el-image style="width: 65px;height: 65px" :src="url"></el-image>
            </el-col>
            <el-col :span="20">
              <el-row>
                <a href="http://www.baidu.com" style="font-size: 20px;text-decoration: none;font-weight: bold">{{comment.userName}}</a>
                <span style="color: rgba(0,0,0,.4);margin-left: 10px;font-size: .875em">{{comment.date}}</span>
              </el-row>
              <el-row>
                <span style="color: rgba(0,0,0,.87);font-size: 16px;margin-top: 3px">{{comment.content}}</span>
              </el-row>


            </el-col>

          </el-row>
        </div>



      </el-card>


    </div>

    <div class="input-part" style="margin-top: 20px">
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
          <el-button type="primary" icon="el-icon-edit-outline" @click="addComment">发布</el-button>

        </el-col>
      </el-row>

    </div>



  </div>


</template>

<script>
export default {
  name: "comment",
  data(){
    return{
      textarea:'',
      username:'',
      email:'',
      url:'https://github.com/Berumotto1/ZeroCup/blob/master/touxiang3.jpg?raw=true',
      comments:[{'commentId':1,'content':'i love you','date':'2020/12/23 10:36','userName':'Berumotto'}]
    }
  },
  methods:{
    addComment(){
      var date=new Date();
      this.comments.push({
        'CommentId':'2',
        'content':this.textarea,
        'date':date.toLocaleString(),
        'userName':this.username
      })
      this.username='';
      this.email='';
      this.textarea='';
    }
  },

  computed: {
    reverseComments() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      var tempComments=JSON.parse(JSON.stringify(this.comments));
      return tempComments.reverse();
    }
  }
}
</script>

<style scoped>
/*.inputArea{*/
/*  height: 150px;*/
/*}*/
.header{
  font-size: 16px;
  font-weight: bold;
}
.divider{
  margin-top: 4px;
  margin-bottom: 4px;
}

</style>