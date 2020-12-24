<template>
  <div class="main-container">
    <el-card class="box-card" :body-style="{padding:'30px 30px 62px 30px'}">
      <div class="course-detail">

        <img :src="imgUrl+'course/1.png'" style="height: 236px;width: 453px"/>
        <div class="middle">
          <span style="font-size: 20px;font-weight: bold;width: 100%;margin-bottom: 12px">12堂声音美化课，全面提升个人魅力</span>
          <span style="font-size: 12px;color: #9C8F8E94">{{ 1923 }}人学过</span>
          <el-rate
              style="margin-left: 43px;font-size: 12px"
              v-model="score"
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
    console.log(this)
    return {
      value: 'abc',
      score:3.7,
      otherscore:3.7,
      ratio: '主页'
    }
  },
  components:{
    MainPage,
    onlineRun,

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

  },
  created() {
  },
}
</script>

<style scoped>
.main-container {
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