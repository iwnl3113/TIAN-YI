import { defineStore } from 'pinia'
import { setItem, getItem } from '@/utils/storage'

const userStore = defineStore('user', {
  state: () => {
    return {
      token:'',
      name: 'admin',
      username: 120,
      roles:'',
    }
  },
  actions:{
    setToken(token){
      this.token = token
      setItem(TOKEN,token)//存储token
    },
  }
})

export default userStore
