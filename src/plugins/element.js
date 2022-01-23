import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import Cookies from "js-cookie";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default (app) => {
  app.use(ElementPlus, {
    size: Cookies.get("size") || "mini", // set element-ui default size
    locale: zhCn, // 如果使用中文，无需设置，请删除
  });
};
