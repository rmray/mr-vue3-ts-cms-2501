<script setup lang="ts">
import { ref } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

// 激活面板名称
const activeName = ref('account')

// 是否记住密码状态
const isRemPwd = ref(false)

// 点击登录按钮
const accountRef = ref<InstanceType<typeof PaneAccount>>()
function hdlLoginClick() {
  if (activeName.value === 'account') {
    accountRef.value?.accountLogin()
  } else {
    console.log('手机登录')
  }
}
</script>

<template>
  <div class="login-pannel">
    <!-- 标题 -->
    <h3>后台管理系统</h3>

    <!-- 登录表单 -->
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="activeName">
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <pane-account ref="accountRef"></pane-account>
      </el-tab-pane>
      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <pane-phone></pane-phone>
      </el-tab-pane>
    </el-tabs>

    <!-- 密码管理 -->
    <div class="control">
      <el-checkbox type="primary" v-model="isRemPwd" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <!-- 立即登录 -->
    <el-button type="primary" class="login-btn" @click="hdlLoginClick">立即登录</el-button>
  </div>
</template>

<style lang="less" scoped>
.login-pannel {
  width: 330px;
  margin-top: -100px;

  h3 {
    text-align: center;
  }

  .custom-tabs-label {
    display: flex;
    .el-icon {
      margin-right: 3px;
      margin-top: 1px;
    }
  }

  .control {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
