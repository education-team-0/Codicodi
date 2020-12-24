<template>
  <div class="main-wrap">
    <div ref="msg" id="chat_msg" class="chat-window">
      <div style="text-align: center;margin-top: 10px;color: white">在线人数:{{ onlineNum }}人</div>
      <div class="message-item" v-for="(item,index) in messageList" :key="index">
        <div v-if="item['left']" class="left">
          <div style="grid-row: 1/3;grid-column: 1/2;text-align: center;">
            <el-avatar :src="item.avatar"></el-avatar>
          </div>
          <div style="font-size: 0.8em;color: #9d9797">{{ item.name }}</div>
          <div class="message" v-html="item.message"></div>
        </div>
        <div v-else class="right">
          <div style="grid-row: 1/3;grid-column: 2/3;text-align: center;">
            <el-avatar :src="item.avatar"></el-avatar>
          </div>
          <div style="font-size: 0.8em;color: #9d9797">{{ item.name }}</div>
          <div class="message" v-html="item.message"></div>
        </div>
      </div>
    </div>
    <div class="send-window">
      <div style="display: flex;flex-direction: column;height: 100%">
        <div style="padding:  10px;display: flex;justify-content: space-between;align-items: center">
          <el-popover
              placement="top-start"
              width="250"
              trigger="hover"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <emotion @emotion="handleEmotion"></emotion>
            <div class="img" slot="reference"/>
          </el-popover>
          <div :class="[btnDown?'send-btn-down':'','send-btn']" @mousedown="btndown" @mouseup="btnup">发 送</div>
        </div>
        <div ref="sendMsg" id="sendMsg" contenteditable="true"></div>
      </div>
    </div>
  </div>
</template>

<script>
import emotion from './Emotion/index'

export default {
  name: "VideoChatRoom",
  components: {
    emotion
  },
  data() {
    return {
      offScrollTop: 0,
      ws: {},   //websocket
      onlineNum: 0,
      btnDown: false,
      messageList: [{
        left: 1,
        avatar: this.imgUrl + 'userAvatar/hello.png',
        name: '郑建宙',
        message: 'naneeanrfffcccccfcccccccccccccccccccccccccccccccccccciae'
      },
        {
          left: 1,
          avatar: this.imgUrl + 'userAvatar/hello.png',
          name: '郑建宙',
          message: 'naneeanrnnfiae'
        },
        {
          left: 1,
          avatar: this.imgUrl + 'userAvatar/hello.png',
          name: '郑建宙',
          message: 'naneeanrnnfiae'
        },
        {
          left: 1,
          avatar: this.imgUrl + 'userAvatar/hello.png',
          name: '郑建宙',
          message: 'naneeanrnnfiae'
        },
        {
          left: 1,
          avatar: this.imgUrl + 'userAvatar/hello.png',
          name: '郑建宙',
          message: 'naneeanrnnfiae'
        },
        {
          left: 1,
          avatar: this.imgUrl + 'userAvatar/hello.png',
          name: '郑建宙',
          message: 'naneeanrnnfiae'
        },
        {
          right: 1,
          avatar: this.imgUrl + 'userAvatar/hello.png',
          name: '郑建宙',
          message: 'naneeanrnnfiae'
        }, {
          right: 1,
          avatar: this.imgUrl + 'userAvatar/hello.png',
          name: '郑建宙',
          message: 'naneeanrnnfiae'
        }, {
          right: 1,
          avatar: this.imgUrl + 'userAvatar/hello.png',
          name: '郑建宙',
          message: 'naneeanrnnfiae'
        },]
    }
  },
  computed: {},
  methods: {
    sendMsg(val) {
      if (val) {
        console.log(val)
        let msgObj = {}
        msgObj['msgType'] = 1
        msgObj['message'] = val
        this.ws.send(JSON.stringify(msgObj))
        const user = this.$store.getters.user
        msgObj = {
          right: true,
          name: user.name,
          avatar: this.imgUrl + user.avatar,
          message: val
        }
        this.messageList.push(msgObj)
        this.$nextTick(() => {
          this.scrollToBottom()
        })

      }
    },
    initWebsocket() {
      const params = this.$route.params
      const courseid = params.courseId + params.chapter + params.section
      const userId = this.$store.getters.user2.userId
      const wsUrl = "ws://localhost:8081/chat/" + courseid + "/" + userId
      const that = this
      this.ws = new WebSocket(wsUrl)
      this.ws.onopen = function (event) {
        console.log('连接打开')
      }
      this.ws.onmessage = function (e) {

        const msg = JSON.parse(e.data)
        console.log(msg)
        switch (msg.msgType) {
          case 0:
            that.onlineNum = msg.number
            break
          case 1: {
            that.messageList.push({
              left: true,
              name: msg.name,
              avatar: that.imgUrl + msg.avatar,
              message: msg.message
            })
            that.$nextTick(() => {
              that.scrollToBottom()
            })
            break
          }
        }

      }
      this.ws.onclose = () => {
        console.log("连接关闭")
      }

      window.onbeforeunload = function () {
        this.ws.close()
      }
    },

    scrollToBottom() {
      const el = document.getElementById("chat_msg")
      el.scrollTop = el.scrollHeight
      this.offScrollTop=el.scrollTop
    },
    emotion(res) {
      let word = res.replace(/[#;]/gi, '')
      const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
      let index = list.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" style="vertical-align: text-bottom">`
    },
    handleEmotion(val) {
      let res = this.emotion(val)
      let el = document.getElementById("sendMsg")
      el.innerHTML += res
      el.focus()
      const range = window.getSelection(); //创建range
      range.selectAllChildren(el); //range 选择obj下所有子内容
      range.collapseToEnd();
    },
    btndown() {
      this.btnDown = true
    },
    btnup() {
      this.btnDown = false
      this.sendMsg(document.getElementById("sendMsg").innerHTML)
      document.getElementById("sendMsg").innerHTML = ''
    }
  },
  activated() {
    document.getElementById('chat_msg').scrollTop=this.offScrollTop;
    console.log(this.offScrollTop)

  },
  created() {
    this.initWebsocket()
  }
}
</script>

<style scoped>
.main-wrap {
  height: 100%;
}

.main-wrap .chat-window {
  padding: 0 10px 10px 10px;
  height: 60%;
  background-image: url("http://edures.oss-cn-hangzhou.aliyuncs.com/background/background.png");
  background-size: contain;
  background-repeat: repeat;
  overflow-y: scroll;
}

.main-wrap .send-window {
  margin: 10px 0 0 0;
  height: 36%
}

.message-item {
  margin-top: 15px;
}

.message-item .message {
  word-break: break-all;
  border-radius: 5px;
  padding: 7px;
}

.left .message {
  background-color: gray;
  color: white;
}

.left {
  margin-right: 80px;
  display: grid;
  grid-template-columns: 40px auto;
  grid-template-rows: 20px 1fr;
  grid-gap: 4px;
  justify-items: left;

}

.right {
  margin-left: 80px;
  display: grid;
  grid-template-rows: 20px 1fr;
  grid-template-columns: 1fr 40px;
  grid-gap: 4px;
  justify-items: right;
}

.right .message {
  background-color: #42b983;
  color: black;
}

.img {
  height: 32px;
  width: 32px;
  background-image: url("http://edures.oss-cn-hangzhou.aliyuncs.com/icon/emoji1.svg");
  background-size: contain;
}

.img:hover {
  cursor: pointer;
  background-image: url("http://edures.oss-cn-hangzhou.aliyuncs.com/icon/emoji.svg");
}

.send-btn {
  margin-right: 20px;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  font-weight: bold;
  user-select: none;
  border-radius: 5px;
}

.send-btn-down {
  font-size: 0.8em;
  transition: all .1s ease;
}

div[contenteditable]#sendMsg {
  outline: none;
  word-break: break-all;
  padding: 10px;
  border: none;
  font-size: 1.1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  flex-grow: 1;
  line-height: 1.2em;
  height: 1px;
  overflow-y: scroll;

}
</style>