<template>
  <div id="run">

<!--    <h1>Markdown</h1>-->

<!--    <el-row>-->
<!--      <el-button type="primary" @click="centerDialogVisible = true">在线运行</el-button>-->
<!--    </el-row>-->


<!--    <el-dialog-->
<!--        title="在线运行"-->
<!--        :visible.sync="centerDialogVisible"-->
<!--        width="80%"-->
<!--        class="dialog"-->
<!--        center>-->

<!--      <onlineRun></onlineRun>-->
<!--    </el-dialog>-->

<!--    <editor class="editor"></editor>-->
    <blog-cell></blog-cell>

  </div>

</template>

<script>
import editor from "@/views/blog/components/editor"
import codemirror from "@/views/blog/components/codemirror";
import onlineRun from "@/views/blog/components/onlineRun";
import blogCell from "@/views/blog/components/blogCell";
export default {
  name: "index",
  components:{
    editor,codemirror,onlineRun,blogCell
  },
  data(){
    return{
      centerDialogVisible: false
    }
  }
}
</script>

<style>
#run{
  text-align: center;
}
</style>

<style scoped>
.dialog{
  /*height: 90% !important;*/
}
/*.editor{*/
/*  height:70% !important;*/
/*}*/


</style>