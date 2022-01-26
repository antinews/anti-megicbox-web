import axios from "axios";
import store from "@/store";
import { successCode, title, requestTimeout } from "@/config";
import { handleCode, handleError } from "./response.handler";

const baseUrl = process.env.VUE_APP_BASE_API;
const perfix = process.env.VUE_APP_DEFAULT_PERFIX;

// create an axios instance
const service = axios.create({
  baseURL: baseUrl + perfix,
  timeout: requestTimeout, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // debugger;
    const token = store.getters.accessToken;
    if (token) {
      // let each request carry token
      // please modify it according to the actual situation
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    const { code, message } = data;
    if (config.responseType && config.responseType === "blob") return data;
    // 是否正常操作
    if ([...successCode].includes(code)) {
      return data;
    }
    handleCode(code, message);
    return Promise.reject(
      `\n${title}请求异常拦截:
      ${JSON.stringify({ url: config.url, code, message }) || "Error"}
      `
    );
  },
  (error) => {
    handleError(error);
  }
);

export default service;
