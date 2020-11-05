<template>
  <div>
    <el-card style="padding: 32px 27px 9px 18px">
      <div class="progressGridWrap">
        <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>

        <div style="justify-self: right"><span class="btn">开始学习</span></div>
        <div style="justify-self: left">目前已完成<strong>{{ 0 }}</strong> 个课时,加油啊！</div>
        <div style="justify-self: right">下一个课时:加油学习哦</div>
      </div>

    </el-card>
    <div class="main-container">
      <el-card style="width: 70%">
        <div slot="header">
          <span style="font-size: 20px;font-weight: bold;">目录</span>
        </div>
        <div>
          <template v-for="(item,index) in chapters">
            <div class="chapterItem" style="background-color: #f6f6f6;font-size: 14px;" :key="index">
              <span style="width:50px">章节</span>
              <div class="circle" :style='item.isChapterFinished|chapterStepCircleFilter'>{{ index + 1 }}</div>
              <div style="color: #9d9797">{{ item.chapterTitle }}</div>
            </div>
            <div class="sectionWrap" :key="index">
              <div v-for="(item2,index2) in item.sections" :key="index2">
                <div class="sectionItem">
                  <span style="color: #9d9797;width: 50px">课时{{ index2 + 1 }}</span>
                  <div class="sectionCircle" :style="item.sectionStep|sectionStepCircleFilter(index2)"></div>
                  <div>{{ item2 }}</div>
                  <div style="flex-grow: 1;text-align: right">
                    <span><i class="el-icon-video-play"/>{{ ' ' + '03:30' }}</span>
                  </div>
                </div>
                <div class="jointLine" v-if="index2<item.sections.length-1"></div>
              </div>
            </div>
          </template>
        </div>
      </el-card>
      <el-card style="width: 30%;margin-left: 15px;padding: 0 10px">
        <div slot="header">
          <span style="font-size: 20px;font-weight: bold;">评价</span>
        </div>
        <div style="padding: 10px 0;font-size: 14px;color: #9d9797">
          <div>给该课程打分:
            <el-rate
                style="margin-left: 5px;font-size: 12px;display: inline-block;vertical-align: middle"
                v-model="rateStar"
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
          </div>
          <div style="width: 70%;margin: 10px 0">
            请尽可能详尽描述你的学习经历，例如学
            习成果、课程内容、讲师风格、教学服务
            等。
          </div>
          <div class="commentItem">
            <div style="display: flex;justify-content: space-between;align-items: center">
              <div style="display: flex;align-items: center">
                <el-avatar :src="imgUrl+'userAvatar/hello.png'"/>
                <span style="margin-left: 5px">{{ '建宙' }}</span>
              </div>
              <el-rate
                  style="font-size: 12px;"
                  v-model="rateStar"
                  disabled
                  show-score
                  :colors="['#42b983','#42b983','#42b983']"
                  text-color="#42b983"
                  score-template="{value}">
              </el-rate>
            </div>
            <div style="margin: 10px 0">
              {{ '请尽可能详尽描述你的学习经历，例如习成果、课程内容、讲师风格、教学服务等。请尽可能详尽描述你的学习经历，例如学习成果、课程内容、讲师风格、教学服务等。' }}
            </div>
            <div style="text-align: right;">{{ '该学员已学习15小时' }}</div>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {

      chapters: [{
        isChapterFinished: true,
        sectionStep: 3,
        chapterTitle: '认识墨刀——就是这么简单高效',
        sections: ["一分钟了解墨刀", '创建项目', '工具栏和弹窗设置面板', '工具栏和弹窗设置面板', '工具栏和弹窗设置面板']
      },
        {
          chapterTitle: '认识墨刀——就是这么简单高效',
          sections: ["一分钟了解墨刀", '创建项目', '工具栏和弹窗设置面板', '工具栏和弹窗设置面板', '工具栏和弹窗设置面板']
        },
        {
          isChapterFinished: true,
          sectionStep: 3,
          chapterTitle: '认识墨刀——就是这么简单高效',
          sections: ["一分钟了解墨刀", '创建项目', '工具栏和弹窗设置面板', '工具栏和弹窗设置面板', '工具栏和弹窗设置面板']
        },
        {
          isChapterFinished: false,
          sectionStep: 3,
          chapterTitle: 'test',
          sections: ["一分钟了解墨刀", '创建项目', '工具栏和弹窗设置面板', '工具栏和弹窗设置面板', '工具栏和弹窗设置面板']
        }],

      rateStar: 3.7


    }
  },
  filters: {
    //filter无this computed有this
    chapterStepCircleFilter(val) {
      if (val)
        return {
          color: 'white',
          fontWeight: 'bold',
          backgroundColor: '#42b983',
          borderColor: '#42b983'
        }
      else
        return {
          borderColor: '#9d9797'
        }
    },
    sectionStepCircleFilter(val, idx) {
      if (idx <= val)
        return {
          backgroundColor: '#42b983',
          borderColor: '#42b983'
        }

    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  margin: 10px 0;
  align-items: flex-start;
}

.progressGridWrap {
  display: grid;
  color: #9d9797;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 30px;

}

.progressGridWrap .btn {
  width: 120px;
  padding: 12px 24px;
  background-color: #42b983;
  color: white;
  font-weight: bold;
}

.chapterItem {
  display: flex;
  padding: 15px;
  align-items: center;
}

.circle {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  border: 1px solid;
  text-align: center;
  margin: 0 10px;
}

.sectionWrap {
  padding: 15px;
}

.sectionWrap .sectionItem {
  display: flex;
  font-size: 14px;
}

.sectionItem .sectionCircle {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  border: 1px #9d9797 solid;
  margin: 0 15px;
}

.jointLine {
  width: 1px;
  height: 15px;
  background-color: #dddddd;
  margin-left: 75px;
}

.commentItem {
  margin: 10px 0;
}
</style>