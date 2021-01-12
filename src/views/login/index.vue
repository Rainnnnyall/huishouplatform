<template>
  <div class="login-container">
    <el-alert
      class="float"
      v-if="lab"
      title="提示"
      type="error"
      description="账号密码不正确请重新输入！"
      show-icon
    >
    </el-alert>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">互联网+物品回收平台系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <div class="tips" v-for="item in this.$store.state.login" :key="item.id">
        <span style="margin-right: 20px">用户名: {{ item.username }}</span>
        <span> 密码: {{ item.password }}</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername, validatePassword } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度至少为六位"));
      } else {
        callback();
      }
    };
    var lab;
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      lab: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      var username = this.$refs.username.value;
      var password = this.$refs.password.value;
      var obj = this.$store.state.login;
      console.log(obj, "9999999999");
      for (var i in obj) {
        var flag = false;
        if (username == obj[i].username && password == obj[i].password) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.loading = true;
        // 1.调用vuex提供的登录方法
        this.$store
          .dispatch("user/login", this.loginForm)
          .then(() => {
            this.$router.push({ path: this.redirect || "/" });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.lab = true;
        setTimeout(() => {
          this.lab = false;
        }, 4000);
      }
      // console.log(key, obj[key]);
      // if (username == key&&password == obj[key]) {
      //   //if () {
      //     console.log("sssssssssssssssdddddddddddddddddddddddddd");
      //     console.log("2222222222");
      //     this.loading = true;
      //     // 1.调用vuex提供的登录方法
      //     this.$store
      //       .dispatch("user/login", this.loginForm)
      //       .then(() => {
      //         this.$router.push({ path: this.redirect || "/" });
      //         this.loading = false;
      //       })
      //       .catch(() => {
      //         this.loading = false;
      //       });
      //       break;
      //   //}
      // }

      // if (valid) {
      //   this.loading = true;
      //   // 1.调用vuex提供的登录方法
      //   this.$store
      //     .dispatch("user/login", this.loginForm)
      //     .then(() => {
      //       this.$router.push({ path: this.redirect || "/" });
      //       this.loading = false;
      //     })
      //     .catch(() => {
      //       this.loading = false;
      //     });
      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.float {
  position: absolute;
  top: 0px;
  width: 400px;
  left: 570px;
}

$bg: rgba(155, 155, 155, 0.7);
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: transparent;
  }
}
</style>

<style lang="scss" scoped>
$bg: transparent;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/earth.jpg");
  background-size: 100% 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
