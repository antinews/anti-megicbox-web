const fs = require("fs");
const { join } = require("path");

function getMocks() {
  // 获取controller下所有文件路径
  const pathArray = [];
  const getFilePaths = (jsonPath) => {
    const jsonFiles = [];
    const findJsonFile = (path) => {
      const files = fs.readdirSync(path);
      files.forEach((item) => {
        const fPath = join(path, item);
        const stat = fs.statSync(fPath);
        if (stat.isDirectory()) getFilePaths(fPath);
        if (stat.isFile()) jsonFiles.push(fPath);
      });
    };
    findJsonFile(jsonPath);
    jsonFiles.forEach((item) => pathArray.push(item));
  };
  getFilePaths("mock/controller");

  let mocks = [];
  pathArray.forEach((item) => {
    const obj = require(join("../", item));
    // const prefix = item.match(/([^\\]+)(\.js)$/)[1];
    const idx = item.indexOf("controller\\");
    const prefix = item.substr(idx + 11, item.length - idx - 14);
    obj.forEach((action) => {
      if (!action.url) {
        action.url = `/${prefix.replace("\\", "/")}/${action.name}`;
      }
    });
    mocks.push(...obj);
  });

  return mocks;
}

module.exports = {
  getMocks,
};
