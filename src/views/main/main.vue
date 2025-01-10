<script setup lang="ts">
import MainHeader from '@/components/main-header/main-header.vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import { ref } from 'vue'

// 点击折叠图标，实现菜单折叠
const isFold = ref(true)
const width = ref('210px')
function hdlFold() {
  isFold.value = !isFold.value
  width.value = isFold.value ? '210px' : '60px'
  console.log(width.value)
}
</script>

<template>
  <div class="main">
    <el-container>
      <el-aside class="aside" :width="width">
        <div class="title">
          <span class="logo">
            <img src="@/assets/images/logo.svg" alt="" />
          </span>
          <h1 v-show="isFold">木头人后台管理</h1>
        </div>
        <!-- 菜单 -->
        <main-menu :is-fold="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <!-- 头部 -->
          <main-header :is-fold="isFold" @fold="hdlFold"></main-header>
        </el-header>
        <el-main class="content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
/** element-plus */
.el-header {
  padding: 0;
}

.main {
  width: 100vw;
  height: 100vh;
  background-color: #e2e3e5;

  .aside {
    height: 100vh;
    background-color: #05142d;
    transition: width 300ms ease;

    &::-webkit-scrollbar {
      display: none;
    }
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      .logo {
        width: 28px;
        height: 28px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      h1 {
        font-size: 18px;
        color: #fff;
        margin-left: 5px;
      }
    }
  }
}
</style>
