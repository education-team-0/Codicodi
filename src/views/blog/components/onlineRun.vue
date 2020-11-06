<template>
  <div>
    <el-row>
      <el-col :offset="1">
        <el-row>
          <el-col :span=6>
            <el-row >
              <el-col :span=22>
                <span style="font-size: 18px">语言: </span>
                <el-select v-model="codeType" placeholder="请选择语言">
                  <el-option
                      v-for="(item,index) in languages"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col  :span=8>
            <el-select v-model="cmOptions.theme" placeholder="切换主题">
            <span slot="prefix" style="font-size: 30px">
             <el-tooltip content="更换主题">
              <i class="icon-pifu"></i>
            </el-tooltip>
            </span>
              <el-option v-for="(item,index) in supportThemes" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>

          </el-col>
        </el-row>

        <el-row class="row">
          <el-col :span=14>
            <codemirror id="code" ref="coder" v-model="content" :options="cmOptions" @changes="onChange"></codemirror>
          </el-col>
          <el-col :offset=1 :span=7>
            <el-card class="box-card">
              <div>
                {{content2}}
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row class="row">
          <el-col :span=1 :offset=9>
            <el-button type="success" icon="el-icon-video-play" @click="runCode">运行</el-button>
          </el-col>
          <el-col :span=1 :offset=1>
            <el-button type="danger" icon="el-icon-video-play">中止</el-button>
          </el-col>
          <el-col :span=1 :offset=1>
            <el-button @click="printContent">打印内容</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { codemirror } from 'vue-codemirror'

require("codemirror/mode/python/python.js")
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')

//引入主题样式
import "codemirror/theme/eclipse.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/idea.css"
import "codemirror/theme/elegant.css"
import "codemirror/theme/dracula.css"
import axios from "axios";

export default {
  name: "code2",
  components:{
    codemirror
  },
  data(){
    return {
      code: "",
      content:'public class Test{\n' +
          '  public static void main(String[] args){\n' +
          '    System.out.println("hello java");\n' +
          '  }\n' +
          '}',
      content2:'',
      cmOptions:{
        mode: "text/x-java",  //Java语言
        theme: "darcula", // 默认主题
        //autofocus: true,
        lineWrapping:true,
        lineNumbers: true,   //显示行号
        //smartIndent: true, // 自动缩进
        autoCloseBrackets: true,// 自动补全括号
        extraKey: {"Ctrl":"autocomplete"},

      },
      coder:'',
      supportThemes:['dracula','idea','eclipse','darcula','blackboard','elegant'],
      languages:['JAVA','Python','C','C++'],
      codeType:'JAVA'
    }
  },
  methods:{
    init(){
      // let myTextarea = document.getElementById('code');
      // this.coder=codemirror.fromTextArea(myTextarea, {
      //   mode:'java',
      //   extraKeys: {"Ctrl": "autocomplete"},
      //   lineNumbers: true//显示行号
      // });
    },
    onChange(){

    },
    printContent(){
      // this.content2=this.coder.getValue()
      this.content2=this.content

    },
    runCode(){
      //var url="http://81.68.205.41:8080/online/run?codeType=java&className="+this.content;
      var url="http://81.68.205.41:8080/online/run";
      //正则获取类的名字
      var reg = new RegExp(/public class ([\s\S]*?){/);
      var className=reg.exec(this.content)
      axios.post(url,{
        "codeType":this.codeType,
        "className":className[1],
        "code":this.content
      })
          .then(
              response => {
                this.content2 = response.data.data;
              }
          )

    }

  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.box-card{
  height: 300px;
  background-color:#d3dce6;
}
.el-row{

}
.el-button{
  /*font-size: 16px;*/
}
.row{
  margin-top: 20px;
}
</style>