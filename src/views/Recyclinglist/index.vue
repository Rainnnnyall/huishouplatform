<template>
  <div class="app-container">
    <router-link to="/example/new">
      <el-button size="mini">新增商品</el-button>
    </router-link>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
    
      <el-table-column align="center" label="商品ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="商品数量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="总金额" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.price * scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column label="删除" width="110" align="center">
        <el-button slot-scope="scope" size="mini" @click="remove(scope.$index, scope.row)">刪除{{scope.row.id}}</el-button>
      </el-table-column>
      <el-table-column label="修改" width="110" align="center">
        <el-button size="mini">修改</el-button>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList,deleteProduct } from "@/api/table";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      id: 0,
      list: null,
      listLoading: true,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
   async remove(index, row) {
      const result = await deleteProduct({ id: row.id });
      this.fetchData();
      //   this.list.findIndex((item,i) => {
      //   if (item.id == id) {
      //     this.list.splice(i,1)
      //     return true
      //   }     
      // })
    }
  }
}
</script>
