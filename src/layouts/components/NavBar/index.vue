<template>
  <div class="nav-bar-wrapper">
    <div class="left-container">
      <hamburger class="hamburger"></hamburger>
      <breadcrumb class="breadcrumb"></breadcrumb>
    </div>

    <div class="right-container">
      <template v-if="device !== 'mobile'">
        <search class="right-menu-item" />
        <error-log class="right-menu-item" />
        <full-screen class="right-menu-item" />
        <size-select class="right-menu-item" />
      </template>
      <avatar />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Breadcrumb from "../NavBar/components/Breadcrumb.vue";
import Hamburger from "../NavBar/components/Hamburger.vue";
import ErrorLog from "../NavBar/components/ErrorLog.vue";
import FullScreen from "../NavBar/components/FullScreen.vue";
import SizeSelect from "../NavBar/components/SizeSelect.vue";
import Search from "../NavBar/components/Search.vue";
import Avatar from "../NavBar/components/Avatar.vue";

export default {
  name: "NavBar",
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    FullScreen,
    SizeSelect,
    Search,
    Avatar,
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },
};
</script>

<style lang="scss" scoped>
.nav-bar-wrapper {
  position: relative;
  overflow: hidden;
  height: $base-nav-bar-height;
  background: #fff;
  box-shadow: 0 1px 4px $base-border-color;
  .right-container {
    float: right;
    height: 100%;
    line-height: $base-nav-bar-height;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
