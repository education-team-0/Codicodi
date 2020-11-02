<template>
  <div>
    <el-row>
      <el-col  span=22 offset=1>
        <el-carousel indicator-position="outside" :height="dataHeight">
          <el-carousel-item v-for="item in imgList" :key="item.id">
            <el-image :src="item.idView"></el-image>
          </el-carousel-item>
        </el-carousel>

      </el-col>

    </el-row>


  </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    dataHeight: {
      type: String,
      default: '320px'
    }
  },
  data(){
    return{
      imgList: [
        {id: 0, idView: require('@/image/login/image3.jpg')},
        {id: 1, name: 'image1', idView: require('@/image/login/image1.jpg')},
        {id: 2, name: 'image2', idView: require('@/image/login/image2.jpg')},
        {id: 3, name: 'image3', idView: require('@/image/login/image4.jpg')},
      ]

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  margin-top: 40px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}





</style>
