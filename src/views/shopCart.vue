<template>
  <div class="cart">
    <div class="title">Shopping Cart</div>
    <div class="form">
      <div class="total">
        <div>
          <van-icon name="checked" color="rgb(1,102,191)" />
          <span>Here is your shopping list!</span>
        </div>
        <div style="margin: 0.2rem; float: right">
          <van-button size="small" type="success">Continue shopping</van-button>
        </div>
      </div>
      <!-- list -->
      <div class="item" v-for="i in 3">
        <div class="close"><van-icon name="close" /></div>
        <div class="sub" style="justify-content: center">
          <van-image width="5rem" height="5rem" fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </div>
        <div class="sub">
          <span>Product:</span>
          <span class="name"> test-name </span>
        </div>
        <div class="sub">
          <span>Price:</span>
          <span class="price"> ${{ 15.0 }} </span>
        </div>
        <div class="sub">
          <span>Quantity:</span>
          <van-stepper v-model="value" />
        </div>
        <div class="sub" style="border-bottom: 0px">
          <span>Subtotal:</span>
          <span class="price"> ${{ 15.0 }} </span>
        </div>
      </div>
      <van-divider :style="{ color: '#1989fa', fontSize: '26px', borderColor: '#1989fa', padding: '0 16px', width: '100%' }"> Cart-totals </van-divider>
      <!-- total-form -->
      <div class="item">
        <div class="sub" style="background: rgb(246, 245, 245); color: rgb(28, 60, 90); font-weight: bolder">Cart totals</div>
        <div class="sub tals">
          <span>Subtotal:</span>
          <span class="price">${{ "1915.00" }} </span>
        </div>
        <div class="sub tals" style="border-bottom: 0px; margin-bottom: 0">
          <span>Shipping Cost:</span>
          <span class="price">${{ "2.0" }} </span>
        </div>
        <div class="sub tals" style="font-size: 10px; margin-top: 0">Shipping options will be updated during checkout.</div>
        <div class="sub tals">
          <span>total:</span>
          <span class="name">${{ "1915.00" }} </span>
        </div>
        <div class="sub btn">
          <van-button type="success" @click="checkout()">Proceed to checkout</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, toRefs, onMounted } from "vue";
  import { useRouter } from "vue-router";
  const router = useRouter();
  const checkout = () =>{
    router.push('/checkout')
  }
</script>

<style scoped lang="less">
  @import url("@/style/cart.less");
</style>
