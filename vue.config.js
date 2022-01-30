const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

const settings = require("./src/config");

const name = settings.title || "Vue Megicbox"; // page title

const mockServer = () => {
  if (process.env.NODE_ENV === "development")
    return require("./mock/mock-server");
  else return "";
};
/**
 * @description vue-cli配置文件 和webpack差不多. 修改配置也需要重新启动serve才能生效
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  // Base directory, when use '' or './', package built can deployed to any directory
  publicPath: "./",
  // Publish files out dir
  outputDir: "dist",
  // Static assets directory
  // Tips：When filename or chunkFilename is overridden from the generated resource, assetsDir is ignored.
  assetsDir: "static",
  // Whether hash file name
  filenameHashing: false,
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    hot: true,
    port: 8008,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    after: mockServer(),
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /*sass-loader 8.0语法 */
        prependData: '@import "@/styles/variables.scss";',

        /*sass-loader 9.0写法*/
        // additionalData(content, loaderContext) {
        //   const { resourcePath, rootContext } = loaderContext;
        //   const relativePath = path.relative(rootContext, resourcePath);
        //   if (
        //     relativePath.replace(/\\/g, "/") !== "src/styles/variables.scss"
        //   ) {
        //     return '@import "~@/styles/variables.scss";' + content;
        //   }
        //   return content;
        // },
      },
    },
  },
  chainWebpack(config) {
    // config.module.rules.delete("svg"); // 删除其他loader对svg文件的编译
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    // set svg-sprite-loader
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "svg-icon-[name]", // xlink:href="#svg-icon-[name]"
      })
      .end();
  },
};
