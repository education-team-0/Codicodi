<template>
  <div class="main-container">
    <div class="header">
      <div style="font-size: 16px;">
        <span style="font-size: 28px">朝哥云课堂</span>
        <span>课程分类<i class="el-icon-arrow-down"></i></span>
        <span>微专业</span>
        <span><i class="el-icon-present">关注领福利</i></span>
      </div>
      <div style="font-size: 14px;border-radius: 20px">
        <span>课程<i class="el-icon-arrow-down"></i></span>
        <el-input style="width: fit-content;" placeholder="搜索课程" suffix-icon="el-icon-search"
                  v-model="value"></el-input>
      </div>
      <div style="font-size: 14px">
        <span>我的学习</span>
        <el-badge :value="12">
          <span style="font-size: 17px"><i class="el-icon-bell"></i></span>
        </el-badge>
        <span style="font-size: 17px;margin-left: 30px"><i class="el-icon-shopping-cart-2"></i></span>
        <span style="align-self: stretch;background-color: white;width: 1px"></span>
        <span>郑建宙</span>
        <span> <el-avatar :src="imgUrl+'userAvatar/hello.png'"></el-avatar></span>
      </div>
    </div>
    <el-card class="box-card" :body-style="{padding:'30px 30px 62px 30px'}">
      <div class="course-detail">

        <img :src="imgUrl+'course/1.png'" style="height: 236px;width: 453px"/>
        <div class="middle">
          <span style="font-size: 20px;font-weight: bold;width: 100%;margin-bottom: 12px">12堂声音美化课，全面提升个人魅力</span>
          <span style="font-size: 12px;color: #9C8F8E94">{{ 1923 }}人学过</span>
          <el-rate
              style="margin-left: 43px;font-size: 12px"
              v-model="rateStar"

              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>
        </div>
        <div class="right">
          <span><i class="el-icon-connection"></i></span>
          <span><i class="el-icon-collection-tag"></i></span>
          <span><i class="el-icon-question"></i></span>
        </div>
      </div>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-radio-group v-model="ratio">
        <el-radio-button label="主页"></el-radio-button>
        <el-radio-button label="笔记"></el-radio-button>
        <el-radio-button label="代码练习区"></el-radio-button>
      </el-radio-group>
    </el-card>
    <keep-alive>
      <component :is="ratio|componentFilter" ></component>
    </keep-alive>

  </div>
</template>

<script>
import onlineRun from "@/views/blog/components/onlineRun";
import MainPage from "@/views/Course/Components/MainPage";
export default {
  name: "Course",
  data() {
    return {
      value: 'abc',
      rateStar:3.7,
      ratio: '代码练习区'
    }
  },
  components:{
    MainPage,
    onlineRun
  },
  filters:{
    componentFilter(val){
      switch (val){
        case "主页":return 'MainPage'
        case "代码练习区":return  'onlineRun'
      }
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.main-container {
}


.header {
  color: white;
  text-align: center;
  background-color: black;
  display: flex;
  justify-content: space-evenly;
  padding: 11px 0px;
}

.header > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header span {
  margin: 0 20px;
}

.course-detail {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.course-detail .middle {

  display: flex;
  flex-wrap: wrap;

}

.course-detail .right {

}
.right span{
  padding: 7px 15px;
  border: 1px solid #E2DEDE;
}

</style>