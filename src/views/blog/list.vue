<template>
  <div>

    <el-row>
      <el-col :offset="1" :span="22">

        <el-card class="box-card"  shadow="never">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="公开" name="publish"></el-tab-pane>
            <el-tab-pane label="草稿箱" name="draft"></el-tab-pane>
            <el-tab-pane label="回收站" name="deleted"></el-tab-pane>
          </el-tabs>

              <el-table :data="list" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="ID" width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.blogId }}</span>
                  </template>
                </el-table-column>

                <el-table-column width="230px" align="center" label="Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.publishTime  }}</span>
                  </template>
                </el-table-column>

                <el-table-column width="120px" align="center" label="Author">
                  <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                  </template>
                </el-table-column>
                <el-table-column class-name="status-col" label="Status" width="110">
                  <template slot-scope="{row}">
                    <el-tag v-if="row.isPublished===1" :type="success">
                      Published
                    </el-tag>
                    <el-tag v-else>
                      Draft
                    </el-tag>

                  </template>
                </el-table-column>

                <el-table-column min-width="150" label="Title">
                  <template slot-scope="{row}">
                    <router-link :to="'/blog/detail/'+row.blogId" class="link-type">
                      <span>{{ row.title }}</span>
                    </router-link>
                  </template>
                </el-table-column>

                <el-table-column min-width="100" label="edit">
                  <template slot-scope="{row}">
                    <router-link :to="'/blog/edit/'+row.blogId" class="link-type">
                      <el-button>Edit</el-button>
                    </router-link>
                  </template>
                </el-table-column>


              </el-table>

          <router-view></router-view>

        </el-card>

      </el-col>
    </el-row>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "list",
  data(){
    return{
      activeName: 'all',
      list:[

        {id:1,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'},
        {id:2,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'},
        {id:3,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'}

          ]
    }
  },
  created() {
    var url="blog/getall?username="+"admin";
    axios.get(url)
        .then(
            response => {
              console.log(response)
              this.list=response.data.data

            }
        )

  },
  methods:{
    handleClick() {
      var url;
      switch (this.activeName){
        case "all":
          url="blog/getall?username="+"admin";
          break;
        case "publish":
          url="blog/getblog?username="+"admin";
          break;
        case "draft":
          url="blog/getdraft?username="+"admin";
          break;
        case "deleted":
          this.list=[];
          break;
      }
      axios.get(url)
          .then(
              response => {
                console.log(response)
                this.list=response.data.data

              }
          )
    }
  }
}
</script>

<style scoped>

</style>