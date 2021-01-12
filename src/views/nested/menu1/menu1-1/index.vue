<template>
  <div class="app-container">
    <h2>添加管理员</h2>
    <div class="">
      <div class="dept">
        <h3>用户名：</h3> 
        <el-input
          ref="newName"
          id="inp"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid"
          v-model="input1"
        >
        </el-input>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="pass">
          <h3>密码</h3>
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            prefix-icon="el-icon-key"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <h2>删除管理员</h2>
    <el-table
      v-loading="listLoading"
      :data="arr"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户名" width="380">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="用户密码" width="380" align="center">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="删除"
        width="380"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="selectPerson(scope.row.id)"
            type="danger"
            style="margin-left: 16px"
          >
            删除
          </el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度至少为六位"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      id: 0,
      list: null,
      listLoading: true,
      drawer: false,
      input1: "",
      arr: [],
      ruleForm: {
        pass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.arr=[]
      //加载没完成时正在等待状态
      this.listLoading = true;
      var arr1 = this.$store.state.login;
      for (var i in arr1) {
        if (arr1[i].id == 0) {
          this.arr.push(arr1[i]);
        }
      }
      this.listLoading = false;
    },
    selectPerson(id) {
      this.id = id;
      this.drawer = true;
    },
    handleEdit(index) {
      var id = this.id;
      var isIt = this.list.findIndex((item) => {
        if (item.id == id) {
          return true;
        }
      });
      console.log(isIt);
      this.list.splice(isIt, 1);
    },
    submitForm() {
      var newAdminName = this.$refs.newName.value;
      var newAdminPassword = this.ruleForm.pass;
      var idd=0
      this.$store.commit('addAdmin',{id:idd,username:newAdminName,password:newAdminPassword})
      this.fetchData()
      this.ruleForm.pass=this.input1=''
    },
  },
};
</script>
<style lang='scss' scoped>
.demo-input-suffix {
  position: relative;
  width: 800px;
  .dept {
    width: 200px;
    float: left;
    margin-right: 20px;
  }
  .deep {
    width: 200px;
    float: left;
  }
}
</style>
