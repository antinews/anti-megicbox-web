<template>
  <div class="avatar-wrapper">
    <el-dropdown>
      <div class="avatar-wrapper el-dropdown-link">
        <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Avatar",
  computed: {
    ...mapState({
      avatar: (state) => state.user.avatar,
    }),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$avatar-width: 40px;
$avatar-height: 40px;
.avatar-wrapper {
  .user-avatar {
    margin: calc(($base-nav-bar-height - $avatar-height) / 2);
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;
  }
}
</style>
