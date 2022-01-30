<template>
  <div class="app-main">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :include="cacheds" :max="keepAliveMaxNum">
        <router-view :key="routePath"></router-view>
      </keep-alive>
    </transition>
    <footer v-show="copyright" class="footer-copyright">
      Copyright
      <svg-icon name="copyright" />
      {{ copyright }}
    </footer>
  </div>
</template>

<script>
import { copyright, keepAliveMaxNum } from "@/config";
export default {
  name: "AppMain",
  data() {
    return {
      copyright,
      keepAliveMaxNum,
    };
  },
  computed: {
    cacheds() {
      return this.$store.state.tagsbar.cacheds;
    },
    routePath() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  min-height: $base-app-main-height;
  width: 100%;
  position: relative;
  overflow: hidden;
  .footer-copyright {
    min-height: 55px;
    line-height: 55px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    border-top: 1px dashed $base-border-color;
  }
}
</style>
