<template>
  <div class="blogcell">
    <el-card shadow="hover" style="width: 70%;margin: auto">
      <el-row style="text-align: left">
        <el-col :span="23">
          <div class="text-wrapper">
              <div class="title">
                <router-link :to="'/blog/detail/'+blog.blogid">
                  <span>{{ blog.title }}</span>
                </router-link>
              </div>
            <div class="tags" style="margin-top: 10px">
              <el-tag style="margin-left: 10px" :key="tag.id"  v-for ="(tag) in tagArr">{{tag}}</el-tag>
            </div>

            <p  style="margin-left: 10px" class="desc">{{blog.desciption}}<router-link :to="'/blog/detail/'+blog.blogid" class="link-type">
              查看更多
              <i class="el-icon-caret-right"></i>
            </router-link>
            </p>

            <p class="operate_info">
              <el-row>
                <el-col :span="3">
                  <span>@{{blog.author}}</span>
                </el-col>
                <el-col :span="8">

                  <span class="publish-time">At time /<a>{{blog.updatetime}}</a></span>
                </el-col>

                <el-col :offset="7" :span="6">
                  <span class="readings"><a ><i class="el-icon-view"></i> {{blog.viewfrequency}} </a></span>
                  <span class="comments"><a ><i class=" el-icon-s-comment"></i> {{blog.commentnum}} </a></span>
                  <span class="likes"><a ><i class="el-icon-star-on"></i> {{blog.collectnum}} </a></span>
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
import moment from 'moment'
export default {
  name: "blogCell",
  props:{
    blog:{
      Type:Object
    }

  },
  data(){
    return{
      tagArr:[]
      // date:''
      // blog:{
      //     'blogId':1,'author':'Berumotto','date':'2020-11-14 10:12','title':'这是一个标题','content':'# 一级标题\n',
      //   'tagList':["JAVA","Docker","BlogSystem"],'description':'这是一条描述！李明获得了保研名额，张华准备出国...我们都有光明的未来！','readNum':999,'starNum':999,
      //   'commentNum':999
      // }
    }
  },
  created() {
    var date=new Date(this.blog.updatetime);
    this.blog.updatetime=moment(date).format('YYYY-MM-DD HH:mm:ss')

    this.tagArr=(this.blog.tags+"").split(',')
  }

}
</script>

<style scoped>
.operate_info{
  margin-left: 10px;
}
.title{
font-size:20px;
/*font-weight:100;*/
/*line-height:25px;*/
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