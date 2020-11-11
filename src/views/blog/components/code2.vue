<template>
  <div>

    <el-card class="box-card">
      <el-row>
        <el-col offset=2 span=2>
          <el-button circle type="primary" icon="el-icon-video-play"></el-button>
          <el-button type="danger" icon="el-icon-video-pause" circle></el-button>
        </el-col>
      </el-row>

      <el-row>
        <codemirror ref="codeMirrorEditor" :value="code" :options="cmOptions" @changes="onChange"></codemirror>
      </el-row>
    </el-card>


  </div>

</template>

<script>
import codemirror from "codemirror/lib/codemirror";
require("codemirror/mode/clike/clike.js");
require("codemirror/addon/edit/closebrackets.js");

export default {
  name: "code2",
  components:{
    codemirror
  },
  data(){
    return {
      code: "",
      cmOptions:{
        mode: "text/x-java",  //Java语言
        theme: "darcula", // 默认主题
        autofocus: true,
        lineNumbers: true,   //显示行号
        smartIndent: true, // 自动缩进
        autoCloseBrackets: true// 自动补全括号
      },
      coder:''
    }
  },
  methods:{
    onChange(){

    },
    init(){
      this.coder = codemirror.fromTextArea(this.$refs.codeMirrorEditor, this.cmOptions)
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
.box-card{
  width: 80%;
  margin-left: 10%;
}
.el-button{
  font-size: 18px;
}
</style>