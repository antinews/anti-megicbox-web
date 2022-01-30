import { login, logout, getInfo } from "@/api/identity/account";
import {
  getAccessToken as getToken,
  setAccessToken as setToken,
  removeAccessToken as removeToken,
} from "@/store/handlers/token.handler";
import router, { resetRouter } from "@/router";
import { ElNotification } from "element-plus";
import { title } from "@/config";

const state = {
  accessToken: getToken(),
  name: "",
  avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  introduction: "",
  roles: [],
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setToken(accessToken);
  },
  setName(state, name) {
    state.name = name;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setIntroduction(state, introduction) {
    state.introduction = introduction;
  },
  setRoles(state, roles) {
    state.roles = roles;
  },
};

const actions = {
  async login({ commit }, loginDto) {
    const { username, password } = loginDto;
    const { data } = await login({ username: username.trim(), password });
    commit("setAccessToken", data.accessToken);
    wellcome();
  },

  async logout({ dispatch }) {
    await logout(state.accessToken);
    resetRouter();
    dispatch("resetToken");
  },

  resetToken({ commit }) {
    commit("setAccessToken", "");
    removeToken();
  },

  /**
   * @description Get user info by access token
   */
  async getInfo({ commit, state }) {
    const { data } = getInfo(state.token);
    const { roles, name, avatar, introduction } = data;
    commit("setName", name);
    commit("setAvatar", avatar);
    commit("setIntroduction", introduction);
    commit("setRoles", roles);
    return data;
  },

  async changeRoles({ dispatch }) {
    // reset router instance
    resetRouter();
    // reset visited views and cached views
    dispatch("tag/clear", null, { root: true });

    // regain access routes
    const routes = await dispatch("route/getRoutes");
    // dynamically add accessible routes
    router.addRoutes(routes);
  },
};

function wellcome() {
  const hour = new Date().getHours();
  console.log(hour);
  let message = "晚上好";
  switch (true) {
    case hour < 6:
      message = `现在是凌晨${new Date()}`;
      break;
    case hour < 8:
      message = "早上好";
      break;
    case hour < 11:
      message = "上午好";
      break;
    case hour < 13:
      message = "中午好";
      break;
    case hour < 18:
      message = "下午好";
      break;
    default:
      message = "晚上好";
  }
  ElNotification.success({
    title: `欢迎登录${title}`,
    message: `${message}`,
  });
}

export default { state, mutations, actions };
