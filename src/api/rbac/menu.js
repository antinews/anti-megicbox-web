import request from "@/utils/axios";

export function getList() {
  return request({
    url: "/rbac/menu/getList",
    method: "get",
  });
}
