<template>
  <div>
    <el-row class="row">
      <el-col :offset="1" :span="2">
        <el-button>
          <i  @click="manageBlog" class="el-icon-arrow-left">文章管理</i>
        </el-button>

      </el-col>
      <el-col :span="15">
        <el-input
            placeholder="请输入标题"
            v-model="title"
            clearable>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button plain @click="printContent">保存草稿</el-button>
        <el-button type="primary" plain>发布文章</el-button>
        <el-button type="primary" @click="centerDialogVisible = true">在线运行</el-button>
      </el-col>
    </el-row>
    <el-dialog
        title="在线运行"
        :visible.sync="centerDialogVisible"
        width="80%"
        class="dialog"
        center>

      <onlineRun></onlineRun>
    </el-dialog>
    <el-row class="row">
      <el-col :offset="1" :span="22">
        <mavon-editor class="editor" v-model="editorContent"></mavon-editor>
      </el-col>


    </el-row>


  </div>
</template>

<script>
import onlineRun from "@/views/blog/components/onlineRun";
export default {
  name: "editor",
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  components:{
    onlineRun
  },
  data(){
    return{
      centerDialogVisible: false,
      editorContent:'# 一级标题\n' +
          '## 二级标题\n' +
          '### 三级标题\n' +
          '**加粗**\n' +
          '|column1|column2|\n' +
          '|--|--|\n' +
          '|1|2|\n' +
          '\n' +
          '```java\n' +
          'public class Test{\n' +
          '  public static void main(String[] args){\n' +
          '    System.out.println("hello java");\n' +
          '  }\n' +
          '}\n' +
          '\n' +
          '```',
      title:'',
      // markdownOption:{
      //   subfield:false
      // }

    }
  },
  created() {
    if(this.isEdit){
      const id = this.$route.params && this.$route.params.id
      console.log(this.$route)
      console.log(this.$route.params)
      this.fetchData(id)
    }
  },
  methods:{
    printContent(){
      console.log(this.editorContent)
    },
    manageBlog(){
      this.$router.push("/blog/list");
    },
    fetchData(id){
      if(id==1){
        this.editorContent='# Hello Test1\n' +
            '```java\n' +
            'public class Test{\n' +
            '  public static void main(String[] args){\n' +
            '    System.out.println("hello java");\n' +
            '  }\n' +
            '}\n' +
            '\n' +
            '```'
      }else if (id==2){
        this.editorContent='# Test2\n' +
            '```java\n' +
            'public class Test{\n' +
            '  public static void main(String[] args){\n' +
            '    System.out.println("hello java");\n' +
            '  }\n' +
            '}\n' +
            '\n' +
            '```'
      }

    }
  },

}
</script>

<style scoped>
.row{
  margin-top: 20px;
}
.editor{
  height: 70%;
}


</style>