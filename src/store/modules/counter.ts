import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 100,
  }),
  actions: {
    plusAction(payload: number) {
      this.count += payload
    },
    minusAction(payload: number) {
      this.count -= payload
    },
  },
})

export default useCounterStore
