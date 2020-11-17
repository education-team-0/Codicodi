<template>
  <div style="display: flex;">
    <div :style="{position:'relative',width:width*0.65+'px',height:height+'px','flex-shrink':0}">
      <video-player class="video-player vjs-custom-skin" style="height: 100%"
                    :options="playerOptions">
      </video-player>
      <div class="barrages-drop">
        <vue-baberrage
            :isShow="barrageIsShow"
            :barrageList="barrageList"
            :loop="barrageLoop"
            :boxHeight="400"
            :messageHeight="10"
        >
        </vue-baberrage>
      </div>
    </div>
    <div style="flex-grow: 1;" >
      <el-card class="box-card" :body-style="{padding:'0 10px 10px 10px'}">
        <div class="right_container">
          <div>
            <el-radio-group style="width: 100%" v-model="option">
              <div class="tabBar">
                <el-radio-button label="目录"></el-radio-button>
                <el-radio-button label="讨论区"></el-radio-button>
              </div>
            </el-radio-group>
          </div>
          <div class="content">
            <keep-alive style="height: 100%">
              <component  style="height: 100%" :is="option|optionFilter"></component >
            </keep-alive>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {MESSAGE_TYPE} from 'vue-baberrage'
import VideoChatRoom from '@/views/Course/Components/CourseVideo/components/VideoChatRoom'
import VideoChapter from "@/views/Course/Components/CourseVideo/components/VideoChapter";

export default {
  name: "CourseVideo",
  components: {
    VideoChatRoom, VideoChapter
  },
  data() {
    return {
      option: '目录',
      //浏览器宽高
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      //websocket
      ws: {},
      messageList: [1, 2, 3, 4, 5, 6, 7],

      // 视频播放
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",
          //src: this.imgUrl + 'video/test.mp4'//url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,//当前时间和持续时间的分隔符
          durationDisplay: true,//显示持续时间
          remainingTimeDisplay: false,//是否显示剩余时间功能
          fullscreenToggle: true  //全屏按钮
        }
      },
      msg: 'Hello vue-baberrage',
      barrageIsShow: true,
      currentId: 1,
      barrageLoop: true,
      barrageList: [{
        id: 1,
        avatar: this.imgUrl + "userAvatar/hello.png",
        msg: '你好啊ddfdsffsddfsd',
        time: 5,
        type: MESSAGE_TYPE.NORMAL,
        barrageStyle: 'red'
      },
        {
          id: 2,
          avatar: this.imgUrl + "userAvatar/hello.png",
          msg: '你好啊ddfdsffsddfsd',
          time: 5,
          type: MESSAGE_TYPE.NORMAL,
          barrageStyle: 'red'
        }]
    }
  },
  filters: {
    optionFilter(val) {
      switch (val) {
        case '目录':
          return 'VideoChapter'
        case '讨论区':
          return 'VideoChatRoom'
      }
    }
  },
  methods: {
    loadmessage() {

    },
    initWebsocket() {
      const params = this.$route.params
      const courseid = params.courseId + params.chapter + params.section
      const userId = this.$store.getters.user.userId
      const wsUrl = "ws://localhost:8081/chat/" + courseid + "/" + userId
      this.ws = new WebSocket(wsUrl)
      this.ws.onopen = function (event) {
        console.log('连接打开')
      }
      this.ws.onclose = () => {
        console.log("连接关闭")
      }

      window.onbeforeunload = function () {
        this.ws.close()
      }
    },
    addlist() {
      let list = [{
        id: 1,
        avatar: this.imgUrl + "userAvatar/hello.png",
        msg: '你好啊ddfdsffsddfsd',
        time: 2,
        type: MESSAGE_TYPE.FROM_TOP,
        barrageStyle: 'red'
      },
        {
          id: 2,
          avatar: this.imgUrl + "userAvatar/hello.png",
          msg: '你好啊ddfdsffsddfsd',
          time: 2,
          type: MESSAGE_TYPE.FROM_TOP,
          barrageStyle: 'green'
        }]
      list.forEach((v) => {
        this.barrageList.push({
          id: v.id,
          avatar: v.avatar,
          msg: v.msg,
          time: v.time,
          type: MESSAGE_TYPE.NORMAL,
          barrageStyle: v.barrageStyle
        });
      });
    }
  },
  created() {
    this.initWebsocket()
  },
  mounted() {
    this.addlist()
  }
}
</script>

<style lang="less" scoped>
.right_container {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.right_container .content {
  flex-grow: 1;
}
html,body{
  height: 100%;
}

.box-card {
  margin-left: 10px;
  height: 89%;
}


.tabBar {
  padding: 12px 0;
  display: flex;
  justify-content: space-around;
  background-color: rgba(210, 213, 218, 100);
}
</style>

<style lang="less">
.video-js{
  bottom: 27px;
}
.el-card__body{
  height: 100%;
}
.baberrage-item .normal {
  background: none !important;
}
.el-radio-button__inner {
  background-color: rgba(210, 213, 218, 100);
  border: none;
  font-weight: bold;
  color: rgba(104, 105, 110, 100);
}

.barrages-drop {
  .blue {
    border-radius: 100px;
    background: #e6ff75;
    color: #fff;
  }

  .green {
    border-radius: 100px;
    background: #75ffcd;
    color: #fff;
  }

  .red {
    border-radius: 100px;
    background: #e68fba;
    color: #fff;
  }

  .yellow {
    border-radius: 100px;
    background: #dfc795;
    color: #fff;
  }

  .baberrage-stage {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    z-index: 0;
    margin-top: 30px;
  }
}
</style>