<script setup lang="ts">
import router from '@/router'
import { localCache } from '@/utils/cache'

/** 退出登录 */
function hdlLogoutClick() {
  // 清除本地存储
  localCache.removeItem('token')
  // 路由跳转
  router.push('/login')
}
</script>

<template>
  <div class="main">
    <div>main</div>
    <el-button type="primary" @click="hdlLogoutClick">退出登录</el-button>
  </div>
</template>

<style lang="less" scoped>
.main {
  color: inherit;
}
</style>
