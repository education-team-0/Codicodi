
<template>
  <div class="main-container">
    <div class="header">
      <div style="font-size: 16px;">
        <span style="font-size: 28px">朝哥云课堂</span>
        <span>课程分类<i class="el-icon-arrow-down"></i></span>
        <span>微专业</span>
        <span><i class="el-icon-present">关注领福利</i></span>
      </div>
      <div style="font-size: 15px;border-radius: 20px">
        <span>课程<i class="el-icon-arrow-down"></i></span>
        <el-input placeholder="搜索课程" suffix-icon="el-icon-search" ></el-input>
      </div>
      <div style="font-size: 15px">
        <span>我的学习</span>
        <span><i class="el-icon-bell"></i></span>
        <span><i class="el-icon-shopping-cart-2"></i></span>
        <span style="align-self: stretch;background-color: white;width: 1px"></span>
        <span>郑建宙</span>
        <span> <el-avatar src="/src/image/login/image1.jpg"></el-avatar></span>

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