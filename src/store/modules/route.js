import { getList } from "@/api/rbac/menu";
import { menus2Routes } from "../handlers/route.handler";

/**
 * @author antinew 2357729423@qq.com
 * @description Route status manager
 * @date 2022-01-09 15:15:55
 */
const state = {
  routes: [],
};
const mutations = {
  addRoutes: (state, routes) => {
    state.routes = state.routes.concat(routes);
  },
};
const actions = {
  async getRoutes({ commit }) {
    const { data } = await getList();
    console.log("data=", data);
    const routes = menus2Routes(data);
    commit("addRoutes", routes);
    return routes;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
