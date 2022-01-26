import { unauthorized, forbidden, nofind, messageDuration } from "@/config";

import { ElMessage } from "element-plus";
import router from "@/router";

/**
 * @author antinew 2357729423@qq.com
 * @description 处理code异常
 * @param {number} code
 * @param {string} message
 */
export const handleCode = (code, message) => {
  switch (code) {
    case unauthorized:
      router.push({ path: "/401" });
      break;
    case forbidden:
      router.push({ path: "/403" });
      break;
    case nofind:
      router.push({ path: "/404" });
      break;
    default:
      ElMessage({
        message: message || "Error",
        type: "error",
        duration: messageDuration,
      });
      break;
  }
};

export const handleError = (error) => {
  let { message } = error;
  // console.log(error);
  if (message === "Network Error") {
    message = "后端接口连接异常";
  }
  if (message.includes("timeout")) {
    message = "后端接口请求超时";
  }
  if (message.includes("Request failed with status code")) {
    const code = message.substr(message.length - 3);
    message = "后端接口" + code + "异常";
  }
  ElMessage({
    message: message || "后端接口未知异常",
    type: "error",
    duration: messageDuration,
  });
  return Promise.reject(error);
};
