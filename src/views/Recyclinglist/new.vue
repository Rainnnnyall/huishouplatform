<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="id" required prop="id">
        <el-col :span="11">
          <el-input v-model="ruleForm.id"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品名称" required prop="title">
        <el-col :span="11">
          <el-input v-model="ruleForm.title"></el-input>
        </el-col>
      </el-form-item>
     
      <el-form-item label="商品价格" required prop="price">
        <el-col :span="11">
          <el-input v-model="ruleForm.price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品数量" required prop="num">
        <el-col :span="11">
          <el-input v-model="ruleForm.num"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
import { addProduct } from "@/api/table";
export default {
  data() {
    function isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    }
    //表单校验：检验是否是数字的方法
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("信息不能为空"));
      }
      setTimeout(() => {
        if (!isNumber(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 200);
    };
    return {
      ruleForm: {
        id: "",
        title: "",  
        price: "",
        num: ""
      },
      rules: {
        id: [
          { required: true, message: "请输入商品id", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        num: [
          { validator: checkNumber, trigger: "blur", required: true , message: "请输入商品数量"}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
         console.log(this.ruleForm)
        if (valid) {
          let result = await addProduct(this.ruleForm);
          this.$router.push("/Recyclinglist/index")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>