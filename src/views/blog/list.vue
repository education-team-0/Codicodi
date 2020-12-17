<template>
  <div>

    <el-row>
      <el-col :offset="1" :span="22">

        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="公开" name="publish"></el-tab-pane>
            <el-tab-pane label="草稿箱" name="draft"></el-tab-pane>
            <el-tab-pane label="回收站" name="deleted"></el-tab-pane>
          </el-tabs>

              <el-table :data="list" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="ID" width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                  </template>
                </el-table-column>

                <el-table-column width="180px" align="center" label="Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.timestamp  }}</span>
                  </template>
                </el-table-column>

                <el-table-column width="120px" align="center" label="Author">
                  <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                  </template>
                </el-table-column>
                <el-table-column class-name="status-col" label="Status" width="110">
                  <template slot-scope="{row}">
                    <el-tag :type="row.status ">
                      {{ row.status }}
                    </el-tag>
                  </template>
                </el-table-column>

                <el-table-column min-width="300px" label="Title">
                  <template slot-scope="{row}">
                    <router-link :to="'/blog/edit/'+row.id" class="link-type">
                      <span>{{ row.title }}</span>
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
  methods:{
    handleClick() {
      switch (this.activeName){
        case "all":
          this.list=[
            {id:1,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'},
            {id:2,timestamp:'2020-11-07 21:58',author:'yhc',status:'draft',title:'test'},
            {id:3,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'}
          ]
          break;
        case "publish":
          this.list=[
            {id:1,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'},
            {id:3,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'}
          ]
          break;
        case "draft":
          this.list=[
            {id:2,timestamp:'2020-11-07 21:58',author:'yhc',status:'draft',title:'test'},
          ]
          break;
        case "deleted":
          this.list=[];
          break;

      }
    }
  }
}
</script>

<style scoped>

</style>