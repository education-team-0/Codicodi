<template>
  <div id="run">
    <div v-for="blog in blogList" :key="blog.blogId">
      <blog-cell :blog="blog" class="blog"></blog-cell>
    </div>



  </div>

</template>

<script>
import blogCell from "@/views/blog/components/blogCell";
import axios from "axios";
import marked from "marked";
export default {
  name: "index",
  components:{blogCell
  },
  data(){
    return{
      centerDialogVisible: false,
      blogList:[]
    }
  },
  methods:{
    getBlog(){
      var url='/blog/getall?username=admin'
      axios.get(url)
          .then(
              response => {
                console.log(response)
                this.blogList=response.data.data;

              }
          )

    }
  },
  created() {
    this.getBlog();
  }
}
</script>

<style>
#run{
  text-align: center;
}
</style>

<style scoped>
.dialog{
  /*height: 90% !important;*/
}
.blog{
  margin-top: 15px;
}


</style>