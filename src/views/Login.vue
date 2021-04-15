<template>
  <div id="login">
    <div class="login-box">
      <div class="icon">
        <img src="../assets/logo.png" />
      </div>
      <div class="login-form">
        <el-form
          ref="loginForm"
          label-width="0px"
          :model="userData"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input
              v-model="userData.username"
              prefix-icon="el-icon-user"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="userData.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="info" @click="reset()"> 重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "用户名长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 8,
            message: "密码长度在 6 到 8个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.loginForm.resetFields();
    },
    login() {
      this.$refs.loginForm.validate((vaild) => {
        if (vaild) {
          this.$store.dispatch("login", this.userData).then((res) => {
            console.log("1111111111", res);
            if (res.status == 200) {
              setTimeout(() => {
                this.$router.push("/home");
              }, 1000);
              this.$message({
                message: "登录成功",
                type: "success",
              });
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
        } else {
          this.$message({
            message: "请输入正确的用户名和密码",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 2px 2px 2px #fff;
  position: relative;
  .icon {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    padding: 5px;
    background-color: #efe;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
