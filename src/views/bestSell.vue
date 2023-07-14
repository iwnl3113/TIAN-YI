<template>
   <div class="home">
     <div class="swipe-box">
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
         <van-swipe-item v-for="item in imgs">
           <img :src="item" alt="" />
         </van-swipe-item>
       </van-swipe>
     </div>
     <div class="title">
       <div class="title-1">Special Offers</div>
       <div class="title-2">Browse our Special Offers of the month!</div>
     </div>
     <div class="goodsList">
       <van-grid :border="false" :column-num="2">
         <van-grid-item>
           <van-image
             src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
           />
         </van-grid-item>
         <van-grid-item>
           <van-image
             src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
           />
         </van-grid-item>
         <van-grid-item v-for="i in 6">
           <van-image
             src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg"
           />
         </van-grid-item>
       </van-grid>
     </div>
     <!-- back-top -->
     <van-back-top right="2vw" bottom="2vh" />
   </div>
 </template>
 
 <script setup>
 import { ref, reactive, toRefs, onMounted } from "vue";
 import { useRouter } from "vue-router";
 const router = useRouter();
 
 const imgs = [
   require("../assets/swipe/3.jpg"),
   require("../assets/swipe/4.jpg"),
   require("../assets/swipe/5.jpg"),
 ];
 </script>
 
 <style lang="less" scoped>
 @import url("@/style/public.less");
 </style>
 