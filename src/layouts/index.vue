<template>
  <div class="megic-box-wrapper" :class="{ mobile: this.device === 'mobile' }">
    <div
      v-if="layout === 'horizontal'"
      class="layout-horizontal"
      :class="{ fixed: header === 'fixed' }"
    >
      <top-menu />
      <tags-bar />
      <app-main />
      <control-panel />
    </div>
    <div v-else class="layout-vertical">
      <side-menu />
      <nav-bar />
      <tag-bar />
      <app-main />
      <control-panel />
    </div>
  </div>
</template>

<script>
import {
  AppMain,
  TopMenu,
  TagsBar,
  ControlPanel,
  NavBar,
  SideMenu,
} from "./components";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    TopMenu,
    TagsBar,
    ControlPanel,
    NavBar,
    SideMenu,
  },
  computed: {
    ...mapState({
      sidebarOpened: (state) => state.app.sidebarOpened,
      device: (state) => state.app.device,
      controlPanel: (state) => state.settings.controlPanel,
      tagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
