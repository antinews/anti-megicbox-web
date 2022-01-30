<template>
  <div class="login-container">
    <!-- <el-alert
      title="欢迎添加作者的企鹅：2357729423"
      type="success"
      :closable="false"
      style="position: fixed"
    ></el-alert> -->
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          label-position="left"
        >
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到{{ title }}！</div>
          <el-form-item style="margin-top: 40px" prop="username">
            <span class="svg-container">
              <svg-icon name="user" />
            </span>
            <el-input
              v-model.trim="loginForm.username"
              v-focus
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="loginForm.password"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              @keyup.enter="handleLogin"
            />
            <span class="show-password" @click="handlePassword">
              <svg-icon
                :name="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="handleLogin"
          >
            登录
          </el-button>
          <!-- <router-link to="/register">
            <div style="margin-top: 20px">注册</div>
          </router-link> -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { usernameValidator, passwordValidator } from "../validators";
import { title } from "@/config";
export default {
  name: "Login",
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  inject: ["$message"],
  data() {
    return {
      title,
      loginForm: {
        username: "Administrator",
        password: "mb!@#123",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "change",
            validator: usernameValidator,
          },
        ],
        password: [
          {
            required: true,
            trigger: "change",
            validator: passwordValidator,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    document.body.style.overflow = "hidden";
  },
  beforeUnmount() {
    document.body.style.overflow = "auto";
  },
  mounted() {},
  methods: {
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    handlePassword() {
      this.passwordType === "password"
        ? (this.passwordType = "")
        : (this.passwordType = "password");
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // this.$router.push({
              //   path: this.redirect || "/",
              //   query: this.otherQuery,
              // });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$dark-gray: #888888;
.login-container {
  height: 100vh;
  background: url("~@/assets/auth_images/login_bg.jpg") center center fixed
    no-repeat;
  background-size: cover;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: rgb(31, 71, 150);
  }

  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: rgba(14, 18, 26, 1);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-btn {
    width: 40%;
    height: 50px;
    margin-top: 5px;
    border: 0;
    font-size: 16px;
    letter-spacing: 28px;
    text-indent: 14px;

    &:hover {
      opacity: 0.9;
    }
  }

  .login-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 425px) / 2) 10% 10%;
    overflow: hidden;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: $base-font-size-default;
    color: $base-color-white;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: $base-color-blue;
      text-align: center;
    }
  }

  .svg-container {
    position: absolute;
    top: 20%;
    left: 1.4em;
    z-index: $base-z-index;
    font-size: 14px;
    color: $dark-gray;
    user-select: none;
  }

  .show-password {
    position: absolute;
    top: 14px;
    right: 25px;
    font-size: 16px;
    color: $dark-gray;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: $base-input-height;
        line-height: $base-input-height;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $base-font-size-small;
        line-height: 18px;
        color: $base-color-red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 58px;
        padding-left: 45px;
        font-size: $base-font-size-default;
        line-height: 58px;
        color: $base-font-color;
        background: #f6f4fc;
        border: 0;
        caret-color: $base-font-color;
      }
    }
  }
}
</style>
