<template>
   <div class="home">
      <div class="swipe-box">
         <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
         <van-swipe-item>1</van-swipe-item>
         <van-swipe-item>2</van-swipe-item>
         <van-swipe-item>3</van-swipe-item>
         <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      </div>
   </div>
</template>


<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>


<style lang='less' scoped>
.swipe-box{
   padding: 0.5rem;
}
.my-swipe .van-swipe-item {
   color: #fff;
   font-size: 20px;
   height: 200px;
   line-height: 150px;
   text-align: center;
   background-color: #39a9ed;
}
</style>