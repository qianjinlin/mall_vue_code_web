<template>
  <div class="login-container">
    <a-form ref="form" :model="form" class="login-form">
      <h2 class="title">用户登录 LOGIN IN</h2>
      <a-form-item>
        <a-input
          class="inputBox"
          v-model="form.username"
          placeholder="请输入用户名"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          class="inputBox"
          v-model="form.password"
          placeholder="请输入密码"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          class="submit"
          type="primary"
          @click="onSubmit"
          :loading="loading"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import * as api from "../../utils/request";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        token: "",
      },
      loading: false,
      clear: true,
    };
  },
  created() {
    //token验证;
  },
  methods: {
    onSubmit() {
      if (
        this.form.username === "" ||
        this.form.username === undefined ||
        this.form.username === null
      ) {
        this.$message.error("请输入用户名");
      } else if (
        this.form.password === "" ||
        this.form.password === undefined ||
        this.form.password === null
      ) {
        this.$message.error("请输入密码");
      } else {
        const _this = this;
        console.info(this.form);
        api
          .getUserLogin("login", _this.form)
          .then((res) => {
            if (res.data.flag) {
              console.info(res);
              this.form.token = res.data.data;
              _this.loading = { delay: 5000 };
              _this.$message.success("登录成功");
              this.cookie.setCookie(this.form, 1);
              this.$router.push({
                path: "/home",
                query: {
                  username: this.cookie.getCookie("username"),
                },
              });
            } else {
              if (
                this.cookie.getCookie("username") === null &&
                res.data.code === 250
              ) {
                _this.$message.warn("请勿随意清除浏览器Cookie");
              } else {
                _this.$message.error(res.data.msg);
              }
            }
          })
          .catch((err) => {
            console.info(err);
          });
        // this.loading = true;
        // this.cookie.setCookie(this.form, 1);
        // this.$router.push({
        //   path: "/home",
        //   query: {
        //     username: this.cookie.getCookie("username"),
        //   },
        // });
      }
    },
  },
};
</script>
<style scoped>
.login-form {
  width: 565px;
  height: 372px;
  margin: 0 auto;
  background: url("../../images/bg2.png");
  padding: 40px 110px;
  margin-top: 200px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../images/bg1.png");
}

.login-title {
  color: #fff;
  text-align: center;
  margin: 150px 0;
  font-size: 48px;
  font-family: Microsoft Yahei;
}
.submit {
  width: 100%;
  height: 45px;
  font-size: 16px;
}
.title {
  margin-bottom: 50px;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  font-family: Microsoft Yahei;
}
.inputBox {
  height: 45px;
}
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
</style>