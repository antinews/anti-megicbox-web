const accessTokens = {
  admin: "admin-accessToken",
  editor: "editor-accessToken",
  test: "test-accessToken",
};

module.exports = [
  {
    url: "/login",
    type: "post",
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
    url: "/register",
    type: "post",
    response() {
      return {
        code: 200,
        message: "模拟注册成功",
      };
    },
  },
];
