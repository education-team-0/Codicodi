<template>
  <div class="main"
       :style="style">
    <div class="contentWrap">
      <el-form :model="form">
        <el-form-item label="请选择类别 :">
          <el-select v-model="form.type.value"
                     placeholder="请选择上传视频类别">
            <el-option
                v-for="item in form.type.type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入课程名称 :">
          <el-input v-model="form.courseName"></el-input>
        </el-form-item>
        <el-form-item label="请输入章节名称 :">
          <el-input v-model="form.chapterName"></el-input>
        </el-form-item>
        <el-form-item label="请上传该章节的教学视频 :">
          <br/>
          <el-upload
              ref="elupload"
              class="upload-demo"
              drag
              :auto-upload="false"
              action=""
              :on-change="changeFile"
              :show-file-list="false"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处,支持多文件上传</div>
            <div class="el-upload__tip" slot="tip">只能上传MP4文件，且不超过500MB
              <span style="font-size: 1.3em;color: dodgerblue;
              margin-left: 10px;cursor: pointer" @click="upload">
              开始上传
            </span></div>
          </el-upload>
          <div v-for="(item,idx) in form.fileList" :key="idx" style="margin:5px 0">
            <div>
              <i class="el-icon-document"></i>
              {{ (form.fileProgress[idx] !== 100 ? '正在上传 ' : '上传成功 ') + item.name }}
            </div>
            <el-progress :text-inside="true"
                         :stroke-width="15"
                         :percentage="form.fileProgress[idx]"/>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="close" @click="closeU">
      <i class="el-icon-circle-close"></i>
    </div>
  </div>
</template>

<script>
import courseType from "@/data/courseType";

export default {
  name: "uploadVideo",
  data() {
    let style = {
      height: window.sessionStorage.getItem('wh') + 'px',
      width: window.sessionStorage.getItem('ww') + 'px'
    }
    let type = courseType.data.map((item) => {
      return {
        value: item,
        label: item
      }
    })
    return {
      style: style,
      form: {
        type: {
          type: type,
          value: ''
        },
        loading: false,
        courseName: '',
        chapterName: '',
        fileList: [],
        fileProgress: [],
      }
    }
  },
  methods: {
    closeU() {
      if (this.loading)
        this.$message.error('文件正在上传中');
      else
        this.$emit('closeUpload')
    },
    changeFile(file, fileList) {
      this.form.fileList = fileList
      this.form.fileProgress = new Array(fileList.length).fill(0)
    },

    upload() {
      if (!this.form.courseName) {
        this.$message.error('请输入课程名');
        return
      } else if (!this.form.chapterName) {
        this.$message.error('请输入章节名');
        return
      } else if (!this.form.type.value) {
        this.$message.error('请选择课程类别');
        return
      }
      this.loading = true
      const Oss = require('ali-oss')
      const client = new Oss({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAI4GAhDRhpfs9LZzjp2GWb',
        accessKeySecret: '3BX1P2eKfdxU1fu9efPjV3wRWXCpdK',
        bucket: 'edures',
      })
      console.log(this.form.fileList)
      Promise.all(this.form.fileList.map((file, idx) => {
        return new Promise((resolve, reject) => {
          //每一个分片上传成功后的回调
          const progress = (p, _checkpoint) => {
            console.log(p); // Object的上传进度。
            console.log(_checkpoint); // 分片上传的断点信息。
            this.form.fileProgress.splice(idx, 1, Math.floor(p * 100))
          }
          // 开始分片上传。
          const self = this

          async function multipartUpload() {
            try {
              const objectName = self.form.courseName + '/' + self.form.chapterName
                  + '/' + file.name
              // object-name可以定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至Bucket根目录或Bucket下的指定目录。
              const result = await client.multipartUpload(objectName, file.raw, {
                progress
              });
              resolve(result)
              //上传成功调用接口存储视频路径

              console.log(result);
            } catch (e) {
              // 捕获超时异常。
              if (e.code === 'ConnectionTimeoutError') {
                console.log('TimeoutError');
                // do ConnectionTimeoutError operation
              }
              console.log(e);
              reject(e)
            }
          }
          multipartUpload();
        })
      })).then(res => {
        if (res.length !== 0) {
          this.loading = false
          this.form.chapterName = ""
          this.form.courseName = ''
          this.$message.success('文件上传成功');
        } else {
          this.$message.warning('请选择上传文件');
        }
        console.log(res)

      }, error => {
        console.log(error)
        this.loading = false
      })
    },
  }
}
</script>

<style scoped>
.main {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
}

.contentWrap {
  width: 60%;
  height: 80%;
  padding: 25px;
  background: white;
  border-radius: 10px;
  overflow-y: scroll;
}

.close {
  color: white;
  position: fixed;
  top: 20px;
  right: 40px;
  font-size: 2.5em;
}

.close:hover {
  color: #9d9797;
}

el-input {
  width: 70%;
}
</style>