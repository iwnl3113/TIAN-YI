<template>
  <div class="container">
    <van-sticky>
      <div class="header">
        <van-icon name="bars" size="30" color="gray" @click="showMenu" />
        <img src="@/assets/lgoo.png" alt="" />
        <van-badge :content="store.addTotal" color="red">
          <van-icon @click="router.push('/cart')" name="shopping-cart" size="30" color="rgb(236, 156, 7);" />
        </van-badge>
      </div>
    </van-sticky>
    <div class="main">
      <router-view />
    </div>
    <div class="bottom">
      <h2>TIAN-YI</h2>
      <div class="link">
        <img src="@/assets/facebook.png" alt="" />
        <img src="@/assets/tw.png" alt="" />
        <img src="@/assets/phone.png" alt="" />
        <img src="@/assets/youtube.png" alt="" />
      </div>
      <div class="tips">
        TIANYI is here to help you get high-quality products with the best
        prices and in an easy way online around the globe.
      </div>
      <img src="@/assets/PaymentMethods.svg" alt="" />
      <div class="tips">2023 © TIAN-YI. All rights reserved.</div>
    </div>
    <!-- 左侧弹出 -->
    <van-popup v-model:show="showLeft" position="left" class="showLeft">
      <img src="@/assets/lgoo.png" alt="" class="logo" />
      <img src="@/assets/welcome.png" style="width: 2rem; padding: 1rem" />
      <div class="menu">
        <ul>
          <li>
            <van-icon name="shop" />
            <router-link to="/"> home </router-link>
          </li>
          <li>
            <van-icon name="shopping-cart" />
            <router-link to="/products"> All products </router-link>
          </li>
          <li>
            <van-icon name="fire" />
            <router-link to="/bestSell"> bestSell </router-link>
          </li>
          <li>
            <van-icon name="gift" />
            <router-link to="/deal"> Promotions </router-link>
          </li>
        </ul>
      </div>
        <div class="tips">Follow our dels:</div>
        <div class="link">
          <img src="@/assets/facebook.png" alt="" />
          <img src="@/assets/tw.png" alt="" />
          <img src="@/assets/phone.png" alt="" />
          <img src="@/assets/youtube.png" alt="" />
        </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { cartStore } from "../store/modules/cart";

const store = cartStore()
const router = useRouter();

const showLeft = ref(false);
const showMenu = () => {
  showLeft.value = true;
};
</script>

<style lang="less">
@import url("@/style/app.less");
.van-badge--top-right{
  padding: 3px 5px;
}
</style>
