import request from "@/utils/axios";

export function login(data) {
  return request({
    url: "/account/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/account/logout",
    method: "post",
  });
}

export function register(data) {
  return request({
    url: "/account/register",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/account/info",
    method: "get",
    params: { token },
  });
}
