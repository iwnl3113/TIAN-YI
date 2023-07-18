<template>
  <div class="order">
    <div class="det-list">
        <van-icon name="cart-circle" size="60" color="#0093ff" />
        <h1>Checkout</h1>
    <h4>Thank you.Your order has been received.</h4>
            
        <div class="item">
            <span>ORDER NUMBER:</span>
            <dt>{{ code }}</dt>
        </div>
        <div class="item">
            <span>DATE:</span>
            <dt>{{ date }}</dt>
        </div>
        <div class="item">
            <span>TOTAL:</span>
            <dt>$  {{ store.amount }}.00</dt>
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
import { cartStore } from '@/store/modules/cart';
const store = cartStore()
const router = useRouter();

const back=()=>{
    store.$reset()
    router.push('/')
}

// date
const getFormattedDate = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const formattedDateValue = `${hours}:${minutes} ${day},${monthNames[monthIndex]},${year}`;
  return formattedDateValue;
};

const date = ref(getFormattedDate());

// code
const generateOrderNumber = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters = Array.from({ length: 2 }, () => letters[Math.floor(Math.random() * letters.length)]);
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${randomLetters.join('')}${randomDigits}`;
};

const code = ref(generateOrderNumber());
</script>



<style scoped lang="less">
@import url("../style/checkout.less");
</style>