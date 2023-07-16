<template>
  <div class="order">
    <div class="det-list">
        <van-icon name="cart-circle" size="60" color="#0093ff" />
        <h1>Checkout</h1>
    <h4>Thank you.Your order has been received.</h4>
            
        <div class="item">
            <span>ORDER NUMBER:</span>
            <dt>8864</dt>
        </div>
        <div class="item">
            <span>DATE:</span>
            <dt>16 July 2023</dt>
        </div>
        <div class="item">
            <span>TOTAL:</span>
            <dt>$17.00</dt>
        </div>
        <div class="item">
            <span>PAYMENT METHOD:</span>
            <dt>Cash on delivery</dt>
        </div>
        <div class="item">
            <van-button type="success"
            @click="back"
            >BACK TO HOME</van-button>
        </div>
    </div>
  </div>
</template>

<script setup >
import { ref, reactive, toRefs, onMounted} from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();

const back=()=>{
    router.push('/')
}


</script>



<style scoped lang="less">
@import url("../style/checkout.less");
</style>