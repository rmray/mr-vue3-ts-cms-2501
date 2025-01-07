<script setup lang="ts">
import useCounterStore from '@/store/modules/counter'

// 获取store
const counterStore = useCounterStore()

// 增加计数
function plus(num: number) {
  counterStore.plusAction(num)
}

// 减少计数
function minus(num: number) {
  counterStore.minusAction(num)
}
</script>

<template>
  <div class="main">
    <div class="show">当前计数：{{ counterStore.count }}</div>
    <button class="btn-add" @click="plus(5)">+5</button>
    <button class="btn-add" @click="minus(5)">-5</button>
  </div>
</template>

<style lang="less" scoped>
.main {
  color: inherit;
}
</style>
