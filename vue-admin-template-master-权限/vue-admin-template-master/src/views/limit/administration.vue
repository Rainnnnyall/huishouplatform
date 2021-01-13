<template>
  <div>
    <div class="top">
      <div>
        <div class="left">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div class="right">
          <el-button>重置</el-button>
          <el-button type="primary">查询搜索</el-button>
        </div>
      </div>
      <div class="search">
        <span>输入搜索：</span>
        <el-input size="medium" placeholder="请输入内容" v-model="inputVal"></el-input>
      </div>
    </div>
    <div class="data">
      <div class="left">
        <i class="el-icon-document"></i>
        <span>数据列表</span>
      </div>
      <div class="right">
        <el-button>添加</el-button>
      </div>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="anilist"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="编码" width="95">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="账号" width="95" align="center">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column label="姓名" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="190" align="center">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="180" align="center">
          <template slot-scope="scope">{{ formatTime(scope.row.ptime) }}</template>
        </el-table-column>
        <el-table-column align="center" label="最后登陆" width="180">
          <template slot-scope="scope">{{ scope.row.endtime }}</template>
        </el-table-column>
        <el-table-column align="center" label="是否启用" width="200">
          <template slot-scope="scope">
            <el-switch
              @change="ISuse(scope.row.id)"
              :value="scope.row.isuse==1?true:false"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="205">
          <template>
            <div class="btn">
              <el-button>分配角色</el-button>
              <el-button>编辑</el-button>
              <el-button>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import zgaxios from "@/utils/zgaxios";
import { Animi } from "@/utils/api";
import { formatTime } from "@/utils/format";

export default {
  name: "Administration",
  data() {
    return {
      inputVal: "",
      anilist: [],
      listLoading: true,
      formatTime
    };
  },
  created() {
    this.getAnimi();
  },
  methods: {
    async getAnimi() {
      let result = await zgaxios("GET", Animi);
      console.log(result);
      this.anilist = result;
      this.listLoading = false;
    },
    ISuse(id) {
      console.log(id);
      this.anilist.forEach(item => {
        if (item.id == id) {
          if (item.isuse == 1) {
            item.isuse = 0;
          }
          if (item.isuse == 0) {
            item.isuse == 1;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.top {
  width: 97%;
  height: 130px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 4px;
  padding: 20px;
  .left {
    float: left;
    span {
      color: #303133;
    }
  }
  .right {
    float: right;
    .el-button--default {
      padding: 9px 10px;
      font-size: 12px;
    }
    .el-button--primary {
      padding: 9px 10px;
      font-size: 12px;
    }
  }
  .search {
    margin-top: 37px;
    margin-left: 50px;
    span {
      color: #606266;
      font-size: 14px;
      padding-right: 12px;
    }
    .el-input {
      width: 200px;
    }
  }
}
//   数据列表
.data {
  width: 97%;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  margin: 20px;
  .left {
    float: left;
    line-height: 40px;
    margin-left: 15px;
  }
  .right {
    float: right;
    .el-button--default {
      padding: 9px 10px;
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
// button按钮
.btn {
  .el-button{
      border: none;
      outline: none;
      padding: 0 4px 0 0;
      color:#409eff;
      span:active{
          background-color: #f5f7fa;
      }
  }
}
</style>
