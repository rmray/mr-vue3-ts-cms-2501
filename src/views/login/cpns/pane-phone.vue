<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

// 表单数据
const phone = reactive({
  phone: '',
  code: ''
})

// 表单验证
const phoneRules: FormRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{4,6}$/, message: '请输入正确的验证码', trigger: 'blur' }
  ]
}
</script>

<template>
  <div class="pane-phone">
    <el-form :model="phone" :rules="phoneRules">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phone.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="code">
        <el-row>
          <el-col :span="13">
            <el-input v-model="phone.code"></el-input>
          </el-col>
          <el-col :span="10">
            <el-button type="primary">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.pane-phone {
  .code .el-row {
    display: flex;
    justify-content: space-between;
  }
}
</style>
