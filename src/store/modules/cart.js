import { defineStore } from 'pinia'
import { setItem, getItem } from '@/utils/storage'

export const cartStore = defineStore('cart', {
  persist:true,
  state: () => {
    return {
      addTotal:0,
      addList:[],
      amount:0,
      email:'',
      address:'',
      params:{},
      goodsDts:{}
    }
  },
  actions:{
    getAmount() {
      this.amount = this.addList.reduce((total, item) => total + item.price * item.quality, 0);
    },
  }
})

