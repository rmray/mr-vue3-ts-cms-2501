<script setup lang="ts">
import LoginPannel from './cpns/login-pannel.vue'
</script>

<template>
  <div class="login">
    <login-pannel />
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url(@/assets/images/login-bg.svg);
}
</style>
