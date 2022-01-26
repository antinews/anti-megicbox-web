/**
 * @author antinew 2357729423@qq.com
 * @description 全局属性
 * @date 2022-01-15 17:16:19
 */
import { messageDuration } from "@/config";
import { ElMessage } from "element-plus";

const install = (Vue) => {
  Vue.provide("$message", (message, type = "success") => {
    ElMessage({
      offset: 10,
      showClose: true,
      message: message,
      type: type,
      dangerouslyUseHTMLString: true,
      duration: messageDuration,
    });
  });
};

export default install;
