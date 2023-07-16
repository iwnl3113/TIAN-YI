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
      <van-grid :border="false" :column-num="2" :gutter="5">
        <van-grid-item v-for="i in 7">
          <div class="item">
            <van-icon name="hot" size="40" style="position: absolute; right: -10px; top: -10px; color: rgb(255, 111, 0);" />
            <van-image
              src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
            />
            <h2>iphone</h2>
            <div class="item-price">
              <span class="price">
                <div class="old">$ 13.0</div>
                <div class="new">$ 113.0</div>
              </span>
              <van-button type="primary" round>
                <van-swipe
                  vertical
                  class="notice-swipe"
                  :autoplay="2000"
                  :touchable="false"
                  :show-indicators="false"
                >
                  <van-swipe-item><van-icon name="cart" size="15" /></van-swipe-item>
                  <van-swipe-item>Add</van-swipe-item>
                </van-swipe>
              </van-button>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="title">
      <div class="title-1">Featured Products</div>
      <div class="title-2">Do not miss our must wanted products</div>
    </div>
    <div class="news-img">
      <img src="@/assets/banner-BLG-small-size.jpg" alt="">
      <img src="@/assets/banner-small-size-perfume.jpg" alt="">
    </div>
    <div class="title">
      <div class="title-1">TIANYI Brands</div>
      <div class="title-2">High quality products from trusted brands !</div>
    </div>
    <div class="swipe-box">
      <van-swipe class="my-swipe2" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in imgs2">
          <img :src="item" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    
    <!-- back-top -->
    <van-back-top style="width: 1.5rem;height: 1.5rem;" right="1rem" bottom="1rem"/>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "../axios/index";
const router = useRouter();

const imgs = [
  require("../assets/swipe/3.jpg"),
  require("../assets/swipe/4.jpg"),
  require("../assets/swipe/5.jpg"),
];
const imgs2 = [
  require("../assets/swipe/honeywell-1.jpg"),
  require("../assets/swipe/kemei.jpg"),
  require("../assets/swipe/sokany.jpg"),
  require("../assets/swipe/sonifer.jpg"),
];
onMounted(() => {
  let params = {
    page:1,
  }
  http
    .post("http://121.41.73.253:8081/test/getGoodsListByPage?page="+params.page)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
});
</script>

<style lang="less" scoped>
@import url("@/style/public.less");

</style>
