<template>
  <div class="blogcell">
    <el-card shadow="hover" style="width: 70%;margin: auto">
      <el-row style="text-align: left">
        <el-col :span="23">
          <div class="text-wrapper">
            <h4 class="title">
              <router-link :to="'/blog/detail/'+blog.blogId" class="link-type">
                <span style="margin-left: 10px">{{ blog.title }}</span>
              </router-link>
            </h4>


            <div class="tags">
              <el-tag style="margin-left: 10px" :key="tag.id"  v-for ="(tag) in blog.tagList">{{tag}}</el-tag>
            </div>

            <p  style="margin-left: 10px" class="desc">{{blog.description}}<router-link :to="'/blog/detail/'+blog.blogId" class="link-type">
              查看更多
              <i class="el-icon-caret-right"></i>
            </router-link>
            </p>

            <p class="operate_info">
              <el-row>
                <el-col :span="3">
                  <span>@{{blog.author}}</span>
                </el-col>
                <el-col :span="5">

                  <span class="publish-time">At time /<a>{{blog.date}}</a></span>
                </el-col>

                <el-col :offset="10" :span="6">
                  <span class="readings"><a ><i class="el-icon-view"></i> {{blog.readNum}} </a></span>
                  <span class="comments"><a ><i class=" el-icon-s-comment"></i> {{blog.commentNum}} </a></span>
                  <span class="likes"><a ><i class="el-icon-star-on"></i> {{blog.starNum}} </a></span>
                </el-col>
                <el-col></el-col>

              </el-row>


            </p>


          </div>


        </el-col>

        <el-col :span="6">

        </el-col>


      </el-row>
    </el-card>

  </div>

</template>

<script>
export default {
  name: "blogCell",
  // props:{
  //   blog:{
  //     Type:Object
  //   },
  //   type:''
  // },
  data(){
    return{
      blog:{
          'blogId':1,'author':'Berumotto','date':'2020-11-14 10:12','title':'这是一个标题','content':'# 一级标题\n',
        'tagList':["JAVA","Docker","BlogSystem"],'description':'这是一条描述！李明获得了保研名额，张华准备出国...我们都有光明的未来！','readNum':999,'starNum':999,
        'commentNum':999
      }
    }
  }

}
</script>

<style scoped>
.operate_info{
  margin-left: 10px;
}
.title{

font-size:23px;
font-weight:100;
line-height:27px;
}

a{
  /*display: block;*/
  cursor: default;
  border: 1px #d3dce6;
  margin-left: 12px;
  color: #b4b4b4 ;
}
p{
  color: #666 ;
}

</style>