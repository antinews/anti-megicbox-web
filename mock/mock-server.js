const { getMocks } = require("./index");
const Mock = require("mockjs");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const chokidar = require("chokidar");
const path = require("path");
const mockDir = path.join(process.cwd(), "mock");

/**
 * @param app
 * @returns {{mockStartIndex: number, mockRoutesLength: number}}
 */
const registerRoutes = (app) => {
  let mockLastIndex;
  let mocks = getMocks();
  console.log(mocks);
  const mocksForServer = mocks.map((item) => {
    return responseFake(item.url, item.method, item.response);
  });

  for (const mock of mocksForServer) {
    app[mock.method](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;

  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
};

const responseFake = (url, method, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    method: method || "get",
    response(req, res) {
      res.status(200);
      if (JSON.stringify(req.body) !== "{}") {
        console.log(chalk.green(`> 请求地址：${req.path}`));
        console.log(chalk.green(`> 请求参数：${JSON.stringify(req.body)}\n`));
      } else {
        console.log(chalk.green(`> 请求地址：${req.path}\n`));
      }
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      );
    },
  };
};

module.exports = (app) => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  let { mockRoutesLength, mockStartIndex } = registerRoutes(app);
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      if (event === "change" || event === "add") {
        try {
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          Object.keys(require.cache).forEach((item) => {
            if (item.includes(mockDir)) {
              delete require.cache[require.resolve(item)];
            }
          });

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;
          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! changed  ${path}`
            )
          );
        } catch (error) {
          console.log(chalk.red(error));
        }
      }
    });
};
