import variables from "@/styles/element/element-variables.scss";
import themeSettings from "@/config/theme.config.js";

const { fixedHeader, controlPanel, tabsBar, sidebarLogo } = themeSettings;

const state = {
  primaryColor: variables.primaryColor,
  controlPanel: controlPanel,
  tagsView: tabsBar,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
};

const mutations = {
  changeTheme: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeTheme({ commit }, data) {
    commit("changeTheme", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
