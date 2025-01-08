<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { Account } from '@/types'

import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import useLoginStore from '@/store/modules/login'
import { localCache } from '@/utils/cache'

// 表单数据模型
const account = reactive<Account>({
  name: localCache.getItem('name') || '',
  password: localCache.getItem('password') || ''
})

// 表单验证规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入账号名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]{3,16}$/, message: '账号名应为 4 到 16 位数字、字母或下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]{3,}$/, message: '密码应为 6 到 16 位数字、字母或下划线', trigger: 'blur' }
  ]
}

// 用户登录
const accountRef = ref<FormInstance | undefined>()
const loginStore = useLoginStore()
function accountLogin(isRemPwd: boolean) {
  // 表单验证
  accountRef.value?.validate((valid) => {
    if (!valid) {
      // 失败
      ElMessage.error('请输入正确的账号名和密码')
    } else {
      // 成功，执行登录
      loginStore.loginAction({ name: account.name, password: account.password })

      // 记住密码
      if (isRemPwd) {
        localCache.setItem('name', account.name)
        localCache.setItem('password', account.password)
      } else {
        localCache.removeItem('name')
        localCache.removeItem('password')
      }
    }
  })
}

// 暴露方法给父组件使用
defineExpose({
  accountLogin
})
</script>

<template>
  <div class="pane-account">
    <el-form :model="account" :rules="accountRules" ref="accountRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
