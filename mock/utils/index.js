/**
 * @author antinew 2357729423@qq.com （不想保留author可删除）
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
function param2json(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    `{${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, " ")}}`
  );
}

module.exports = {
  param2json,
};
