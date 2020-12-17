<template>
  <div style="height: 100%;">
    <el-row style="height: 100%">
      <el-col :offset="1" :span="4" style="height: 100%">
        <el-card class="box-card author-card" shadow="hover">
          <h1>个人信息</h1>
        </el-card>
      </el-col>

      <el-col :span="18" style="margin-left: 10px">
        <el-row>
          <el-card class="box-card" shadow="never">
            <el-row style="text-align: left">
              <span><h2>{{ blogInfo.title }}</h2></span>

            </el-row>

            <el-row>
              <el-card class="box-card info-card" shadow="hover">
                <!--              <span>个人信息</span>-->
                <el-row>
                  <el-col :offset="1" :span="4"><span class="greyText">Author: </span>{{blogInfo.author }}</el-col>
                  <el-col :span="6"><span class="greyText">Pubish Date: </span><span>{{blogInfo.date}}</span></el-col>
                  <el-col :span="6"><span class="greyText">Update Date: </span><span>{{blogInfo.date}}</span></el-col>
                </el-row>

              </el-card>
            </el-row>

            <el-row style="margin-top: 20px">
              <div v-html="blogInfo.content" class="markdown-body" style="text-align: left"></div>
            </el-row>
          </el-card>
        </el-row>

        <el-row style="margin-top: 10px">
          <el-card  shadow="never">
            <h1>评论区</h1>
          </el-card>
        </el-row>


      </el-col>

    </el-row>


  </div>
</template>

<script>
import marked from 'marked'
import axios from "axios";
export default {
  name: "detail",
  data(){
    return{
      detail:'',
      blogInfo:'',

    }

  },
  created() {
    const id = this.$route.params && this.$route.params.id
    console.log(this.$route)
    console.log(this.$route.params)
    this.fetchData(id)
    console.log(this.blogInfo)

  },
  methods:{

    fetchData(id){
      //请求后端接口获取数据
      console.log("fetchData")
      var url="/blog/getBlogById?id="+id;
      axios.get(url)
          .then(
              response => {
                console.log(response)
                this.blogInfo=response.data.data
                this.blogInfo.content=marked(this.blogInfo.content)
              }
          )

      // this.blogInfo={'author':'Berumotto','date':'2020-11-14 10:12','title':'这是一个标题','content':'# 一级标题\n' +
      //       '## 二级标题\n' +
      //       '### 三级标题\n' +
      //       '**加粗**\n' +
      //       '\n' +
      //       '```java\n' +
      //       'public class Test{\n' +
      //       '  public static void main(String[] args){\n' +
      //       '    System.out.println("hello java");\n' +
      //       '  }\n' +
      //       '}\n' +
      //       '\n' +
      //       '```',}

    }
  },

}
</script>

<style scoped>
@import "components/css/markdown.css";
@import "https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css";
.info-card{
  background-color: #f8f8f8;
  margin-top: 10px;
}
.author-card{
  height: 80%;
  background-color: #FFFFFF;
}
.blog-foot{
  background-color: #FFFFFF;
  margin-top: 20px;
}
.greyText{
  color: #999aaa;
}

</style>