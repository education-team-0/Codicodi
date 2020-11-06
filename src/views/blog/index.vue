<template>
  <div>

    <h1>Markdown</h1>

    <el-row>
      <el-button type="primary" @click="centerDialogVisible = true">在线运行</el-button>
    </el-row>


    <el-dialog
        title="在线运行"
        :visible.sync="centerDialogVisible"
        width="80%"
        class="dialog"
        center>

      <onlineRun></onlineRun>
    </el-dialog>

    <editor></editor>



  </div>

</template>

<script>
import editor from "@/views/blog/components/editor"
import codemirror from "@/views/blog/components/codemirror";
import code2 from "@/views/blog/components/code2";
import onlineRun from "@/views/blog/components/onlineRun";
export default {
  name: "index",
  components:{
    editor,codemirror,code2,onlineRun
  },
  data(){
    return{
      centerDialogVisible: false

    }
  }
}
</script>

<style scoped>
.dialog{
  /*height: 90% !important;*/
}

</style>