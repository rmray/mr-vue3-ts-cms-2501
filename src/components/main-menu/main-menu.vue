<script setup lang="ts">
import { storeToRefs } from 'pinia'
import router from '@/router'

import useLoginStore from '@/store/modules'
import type { Menu } from '@/types'
import { mapPathToMenu } from '@/utils/map-to/map-path-to-menu'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

defineProps<{
  isFold: boolean
}>()

// 获取store数据
const loginStore = useLoginStore()
const { roleMenus } = storeToRefs(loginStore)

// 点击菜单跳转
function hdlJumpClick(item: Menu) {
  console.log(item)
  router.push(item.url)
}

// 根据路径匹配激活菜单
const route = useRoute()
const activeMenu = computed(() => mapPathToMenu(route.path, roleMenus.value))
</script>

<template>
  <div class="main-menu">
    <el-menu
      active-text-color="#ffffff"
      background-color="#05142d"
      class="el-menu-vertical-demo"
      :default-active="activeMenu?.id + ''"
      text-color="#b2bccd"
      unique-opened
      :collapse="!isFold"
    >
      <template v-for="roleMenu in roleMenus" :key="roleMenu.id">
        <el-sub-menu :index="roleMenu.id + ''">
          <template #title>
            <el-icon><component :is="roleMenu.icon.replace('el-icon', '')" /></el-icon>
            <span>{{ roleMenu.name }}</span>
          </template>
          <template v-for="child in roleMenu.children" :key="child.id">
            <el-menu-item :index="child.id + ''" @click="hdlJumpClick(child)">{{ child.name }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
/** element-plus */
.el-menu {
  border-right: none;

  .el-menu-item {
    background-color: #0c1f36;
    &.is-active {
      background-color: #0b5dbe;
    }
  }
}

.main-menu {
  color: inherit;
}
</style>
