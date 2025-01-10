<script setup lang="ts">
import router from '@/router'
import useLoginStore from '@/store/modules'

import { localCache } from '@/utils/cache'
import { mapPathToCrumb } from '@/utils/map-to/map-path-to-crumb'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
  isFold: boolean
}>()

const emit = defineEmits(['fold'])

// 点击折叠图标，发射折叠事件
function hdlIconClick() {
  emit('fold')
}

// 点击退出登录
function hdlLogoutClick() {
  localCache.removeItem('token')
  router.push('/login')
}

// 根据路径匹配当前面包屑
const route = useRoute()
const loginStore = useLoginStore()
const { roleMenus } = storeToRefs(loginStore)
const crumbs = computed(() => mapPathToCrumb(route.path, roleMenus.value))
</script>

<template>
  <div class="main-header">
    <!-- 折叠图标 -->
    <div class="menu-icon" @click="hdlIconClick">
      <el-icon size="28"><component :is="isFold ? 'Fold' : 'Expand'" /></el-icon>
    </div>

    <div class="content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb separator-icon="ArrowRight">
          <template v-for="crumb in crumbs" :key="crumb.id">
            <el-breadcrumb-item :to="crumb.url">{{ crumb.name }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>

      <!-- 用户信息 -->
      <div class="user-info">
        <div class="interactive">
          <span>
            <el-icon size="16"><Bell /></el-icon>
          </span>
          <span>
            <el-icon size="16"><ChatDotRound /></el-icon>
          </span>
          <span>
            <el-icon size="16"><ChatLineSquare /></el-icon>
          </span>
        </div>
        <div class="user">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
                :size="30"
                src="https://foruda.gitee.com/avatar/1672726238822211763/5636878_meray_1672726238.png"
              />
              <span class="username">{{ '用户' }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="hdlLogoutClick">
                  <el-icon><Close /></el-icon>
                  <span>退出系统</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon><InfoFilled /></el-icon>
                  <span>个人信息</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon><Lock /></el-icon>
                  <span>修改密码</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/** element-plus */
.el-dropdown {
  .el-dropdown-link {
    display: flex;
    align-items: center;

    // 去掉下拉菜单的轮廓线
    &:focus {
      outline: none;
    }
  }
}
:deep(.el-dropdown-menu__item) {
  line-height: 30px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #fff;

  .menu-icon {
    display: flex;
    align-items: center;
    width: 40px;
    cursor: pointer;
  }

  .content {
    flex: 1;

    display: flex;
    justify-content: space-between;

    .breadcrumb {
      display: flex;
      align-items: center;
    }

    .user-info {
      display: flex;
      align-items: center;
      .interactive {
        .el-icon {
          cursor: pointer;
          margin-right: 15px;
        }
      }
      .user {
        cursor: pointer;
        .username {
          margin: 0 10px 0 5px;
        }
      }
    }
  }
}
</style>
