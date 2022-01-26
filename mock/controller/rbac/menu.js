const routes = [];

module.exports = [
  {
    name: "getList",
    method: "get",
    response() {
      return {
        code: 200,
        message: "成功！",
        data: routes,
      };
    },
  },
];
