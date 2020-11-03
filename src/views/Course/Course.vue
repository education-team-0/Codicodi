
<template>
  <div class="main-container">
    <div class="header">
      <div style="font-size: 16px;">
        <span style="font-size: 28px">朝哥云课堂</span>
        <span>课程分类<i class="el-icon-arrow-down"></i></span>
        <span>微专业</span>
        <span><i class="el-icon-present">关注领福利</i></span>
      </div>
      <div style="font-size: 14px;background-color: #9CA6A4A4;border-radius: 20px">
        <span>课程<i class="el-icon-arrow-down"></i></span>
        <el-input aria-placeholder="dsad" ></el-input>
        <!--        <label>-->
        <!--          <input style="background-color: #9CA6A4A4" placeholder="搜索课程">-->
        <!--        </label>-->
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Course"
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
.header > div{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header span{
  margin: 0 20px;
}
</style>