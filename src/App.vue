<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const showLeft = ref(false)
const showMenu = ()=>{
  showLeft.value = true 
}
</script>

<style lang="less" scoped>
.app{
  height: 100vh;
  width: 100vw;
  background-color: rgb(232, 236, 248);
  overflow-y: auto;
}
</style>
