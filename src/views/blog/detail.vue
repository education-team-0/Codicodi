<template>
  <div style="height: 100%;">
    <el-row style="height: 100%">
      <el-col :offset="1" :span="4" style="height: 100%">
        <el-card class="box-card author-card">
          <h1>个人信息</h1>
        </el-card>
      </el-col>

      <el-col :span="18" style="margin-left: 10px">
        <el-row>
          <el-card class="box-card">
            <el-row style="text-align: left">
              <span><h2>{{ blogInfo.title }}</h2></span>

            </el-row>

            <el-row>
              <el-card class="box-card info-card">
                <!--              <span>个人信息</span>-->
                <el-row>
                  <el-col :offset="1" :span="4">{{blogInfo.author }}</el-col>
                  <el-col :offset="1" :span="6">{{blogInfo.date}}</el-col>

                </el-row>
                <el-row style="margin-top: 5px">
                  <el-col :offset="1" :span="4">文章标签:</el-col>
                </el-row>

              </el-card>
            </el-row>

            <el-row style="margin-top: 20px">
              <div v-html="blogInfo.content" class="markdown-body" style="text-align: left"></div>
            </el-row>
            <!--          <el-footer class="blog-foot">-->

            <!--          </el-footer>-->
          </el-card>
        </el-row>

<!--        <el-row>-->
<!--          <el-card>-->
<!--            <h3>点赞</h3>-->
<!--          </el-card>-->
<!--        </el-row>-->
        <el-row style="margin-top: 10px">
          <el-card>
            <h1>评论区</h1>
          </el-card>
        </el-row>


      </el-col>

    </el-row>


  </div>
</template>

<script>
import marked from 'marked'
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
    this.blogInfo.content=marked(this.blogInfo.content)
  },
  methods:{

    fetchData(id){
      //请求后端接口获取数据
      console.log("fetchData")
      this.blogInfo={'author':'Berumotto','date':'2020-11-14 10:12','title':'这是一个标题','content':'# 一级标题\n' +
            '## 二级标题\n' +
            '### 三级标题\n' +
            '**加粗**\n' +
            '\n' +
            '```java\n' +
            'public class Test{\n' +
            '  public static void main(String[] args){\n' +
            '    System.out.println("hello java");\n' +
            '  }\n' +
            '}\n' +
            '\n' +
            '```',}

    }
  },

}
</script>

<style scoped>
@import "components/css/markdown.css";
@import "https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css";
.info-card{
  background-color: #F7F7FC;
  margin-top: 10px;
}
.author-card{
  height: 80%;
}
.blog-foot{
  background-color: #F7F7FC;
  margin-top: 20px;
}


</style>