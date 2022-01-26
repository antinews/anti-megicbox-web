const accessTokens = {
  Administrator: "admin-accessToken",
  editor: "editor-accessToken",
  test: "test-accessToken",
};

module.exports = [
  {
    name: "login",
    method: "post",
    response(config) {
      const { username } = config.body;
      const accessToken = accessTokens[username];
      if (!accessToken) {
        return {
          code: 500,
          message: "帐户或密码不正确。",
        };
      }
      return {
        code: 200,
        message: "success",
        data: { accessToken },
      };
    },
  },
  {
    name: "register",
    method: "post",
    response() {
      return {
        code: 200,
        message: "模拟注册成功",
      };
    },
  },
  {
    name: "logout",
    method: "post",
    response() {
      return {
        code: 200,
        message: "模拟退出成功！",
      };
    },
  },
];
