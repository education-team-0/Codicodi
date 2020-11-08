<template>
  <div>
    <h1>文章列表</h1>
    <el-row>
      <el-col :offset="1" :span="22">
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

      </el-col>


    </el-row>


    <router-view></router-view>
<!--    <router-view/>-->
  </div>

</template>

<script>
export default {
  name: "list",
  data(){
    return{
      list:[

        {id:1,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'},
        {id:2,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'},
        {id:3,timestamp:'2020-11-07 21:58',author:'yhc',status:'published',title:'test'}

          ]
    }
  }
}
</script>

<style scoped>

</style>