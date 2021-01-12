<template>
  <div class="app-container">
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
      <el-table-column label="商品名称" width="240">
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
      <el-table-column
        class-name="status-col"
        label="分配订单"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="selectPerson(scope.row.id)"
            type="primary"
            style="margin-left: 16px"
          >
            分配订单
          </el-button>
          <el-drawer
            title="订单分配列表"
            :visible.sync="drawer"
            :with-header="false"
          >
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="回收员编号" width="170">
                <template slot-scope="scope">
                  <i class="el-icon-medal-1"></i>
                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="回收员姓名" width="170">
                <template slot-scope="scope">
                  <i class="el-icon-user-solid"></i>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.row.id)"
                    >提交</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-drawer>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";
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
      id:0,
      list: null,
      listLoading: true,
      drawer: false,
      tableData: [
        {
          id: 123,
          name: "丁志远",
        },
        {
          id: 124,
          name: "胡召琪",
        },
        {
          id: 125,
          name: "王小虎",
        },
        {
          id: 126,
          name: "李老六",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      //加载没完成时正在等待状态
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        //加载完成时等待状态结束
        this.listLoading = false;
      });
    },
    selectPerson(id) {
      this.id=id
      this.drawer = true;
    },
    handleEdit(index) {
      var id=this.id;
      var isIt=this.list.findIndex((item) => {
        if(item.id==id){
          return true
        }
      });
      console.log(isIt)
      this.list.splice(isIt,1)
    },
  },
};
</script>
