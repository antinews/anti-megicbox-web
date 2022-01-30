import Cookies from "js-cookie";

const state = {
  sidebarOpened: Cookies.get("sidebarOpened") || true,
  device: "desktop",
  size: Cookies.get("size") || "medium",
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    const opened = !state.sidebarOpened;
    state.sidebarOpened = opened;
    Cookies.set("sidebarOpened", opened);
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    Cookies.set("size", size);
  },
};
const actions = {
  toggleSidebar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  setSize({ commit }, size) {
    commit("SET_SIZE", size);
  },
};
export default {
  state,
  mutations,
  actions,
};
