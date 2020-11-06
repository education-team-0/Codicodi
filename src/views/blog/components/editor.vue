<template>
  <div>
    <el-row class="row">
      <el-col :offset="1" :span="17">
        <el-input
            placeholder="请输入标题"
            v-model="title"
            clearable>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button plain @click="printContent">保存草稿</el-button>
        <el-button type="primary" plain>发布文章</el-button>
      </el-col>


    </el-row>
    <el-row class="row">
      <el-col :offset="1" :span="22">
        <mavon-editor class="editor" v-model="editorContent"></mavon-editor>
      </el-col>


    </el-row>

  </div>
</template>

<script>
export default {
  name: "editor",
  data(){
    return{
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
      title:''
    }
  },
  methods:{
    printContent(){
      console.log(this.editorContent)
    }
  }

}
</script>

<style scoped>
.row{
  margin-top: 20px;
}
.editor{
  height: 50%;
}
</style>