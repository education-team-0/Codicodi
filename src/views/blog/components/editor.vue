<template>
  <div>
    <el-row class="row">
      <el-col :offset="1" :span="2">
        <el-button>
          <i  @click="manageBlog" class="el-icon-arrow-left">文章管理</i>
        </el-button>

      </el-col>
      <el-col :span="13">
        <el-input
            placeholder="请输入标题"
            v-model="blog.title"
            clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button plain @click="publishDraft" style="margin-left: 20px">保存草稿</el-button>
        <el-button type="primary" plain @click="DialogVisible = true">发布文章</el-button>
        <el-button type="primary" @click="centerDialogVisible = true">在线运行</el-button>
      </el-col>
    </el-row>

    <el-dialog
        title="发布文章"
        :visible.sync="DialogVisible"
        width="50%"
        class="dialog"
        center>


      <el-form ref="blogForm" :model="blogForm" label-width="80px">

        <el-form-item label="文章标签">
          <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

        </el-form-item>

        <el-form-item label="文章描述">
          <el-input type="textarea" v-model="blogForm.desc" :rows="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :offset="7" :span="8">
              <el-button type="primary" @click="publishBlog">发布文章</el-button>
              <el-button @click="DialogVisible=false">取消</el-button>
            </el-col>
          </el-row>


        </el-form-item>
      </el-form>

    </el-dialog>





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
import axios from "axios";
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
      blog:'',
      centerDialogVisible: false,
      DialogVisible: false,
      editorContent:'',
      title:'Test',
      blogForm: {
        desc:'',
        tags:''
      },
      dynamicTags: ['Spring','Blog','SpringBoot'],
      inputVisible: false,
      inputValue: ''

    }
  },
  created() {
    if(this.isEdit){
      const id = this.$route.params && this.$route.params.id
      console.log(this.$route)
      console.log(this.$route.params)
      if(id){
        this.fetchData(id)
      }
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
      var url="/blog/getBlogById?id="+id;
      axios.get(url)
          .then(
              response => {
                console.log(response.data)
                // this.editorContent=response.data.data.content
                // this.title=response.data.data.title
                this.blog= JSON.parse(JSON.stringify(response.data.data))
                this.blogForm.desc=this.blog.desciption
                this.dynamicTags=(this.blog.tags+"").split(',')
                this.editorContent=this.blog.content
              }
          )
    },
    publishDraft(){
      var d=new Date();
      var url="blog/publish";
      var id;

      this.blog.updatetime=d;
      this.blog.ispublished=0;
      this.blog.content=this.editorContent
      axios.post(url,
        this.blog
      )
          .then(
              response => {
                console.log(response)
                this.$message({
                  message: '发布成功!',
                  type: 'success'
                });
              }
          )
    },
    publishBlog(){
      var d=new Date();
      var url="blog/publish";

      this.blog.content=this.editorContent
      this.blog.updatetime=d;
      this.blog.ispublished=1;
      this.blog.desciption=this.blogForm.desc;
      this.blog.tags=this.dynamicTags.toString();
      axios.post(url,this.blog
        // "title":this.title,
        // "content":this.editorContent,
        // "author":"admin",
        // "publishtime":d,
        // "ispublished":1,
        // "blogid":this.$route.params && this.$route.params.id,
        // "desciption":this.blogForm.desc,
        // "tags":this.dynamicTags.toString(),
      )
          .then(
              response => {
                console.log(response)
                this.$message({
                  message: '发布成功!',
                  type: 'success'
                });
              }
          )
      this.DialogVisible=false
      this.blogForm.desc=''
      this.dynamicTags= ['Spring','Blog','SpringBoot']
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      console.log(this.dynamicTags.toString())
      this.inputVisible = false;
      this.inputValue = '';
    }

  }

}
</script>

<style scoped>
.row{
  margin-top: 20px;
}
.editor{
  height: 70%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}


</style>