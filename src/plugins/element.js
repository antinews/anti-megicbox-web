import ElementPlus from "element-plus";
import "@/styles/element/element-variables.scss";
import "element-plus/lib/theme-chalk/index.css";
import Cookies from "js-cookie";
import enLang from "element-plus/es/locale/lang/zh-cn";

export default (app) => {
  app.use(ElementPlus, {
    size: Cookies.get("size") || "medium", // set element-ui default size
    locale: enLang, // 中文zhCn
  });
};
