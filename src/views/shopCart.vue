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
          <van-button size="small" type="success" @click="router.push('/')">Continue shopping</van-button>
        </div>
      </div>
      <!-- list -->
      <div class="item" v-for="item in list" v-if="list.length != 0">
        <div class="close"><van-icon name="close" @click="dlt(item.goodsName,list,item.quality,item.price)" /></div>
        <div class="sub" style="justify-content: center">
          <van-image
            height="10rem"
            width="10rem"
            fit="cover"
            :src=item.picFileName
          />
        </div>
        <div class="sub">
          <span>Product:</span>
          <span class="name"> {{ item.goodsName }} </span>
        </div>
        <div class="sub">
          <span>Price:</span>
          <span class="price">$ {{ item.price }}.00</span>
        </div>
        <div class="sub">
          <span>Quantity:</span>
          <van-stepper v-model="item.quality" @plus="plus(item.price)" @minus="minus(item.price)" />
        </div>
        <div class="sub" style="border-bottom: 0px">
          <span>Subtotal:</span>
          <span class="price"> ${{ item.price * item.quality }}.00 </span>
        </div>
      </div>
      <van-divider
        :style="{
          color: '#1989fa',
          fontSize: '26px',
          borderColor: '#1989fa',
          padding: '0 16px',
          width: '100%',
        }"
      >
        Cart-totals
      </van-divider>
      <!-- total-form -->
      <div class="item" v-if="list.length != 0">
        <div
          class="sub"
          style="
            background: rgb(246, 245, 245);
            color: rgb(28, 60, 90);
            font-weight: bolder;
          "
        >
          Cart totals
        </div>
        <div class="sub tals">
          <span>Subtotal:</span>
          <span class="price">${{ store.amount }}.00 </span>
        </div>
        <div class="sub tals" style="border-bottom: 0px; margin-bottom: 0">
          <span>Shipping Cost:</span>
          <span class="price">${{ "2.0" }} </span>
        </div>
        <div class="sub tals" style="font-size: 10px; margin-top: 0">
          Shipping options will be updated during checkout.
        </div>
        <div class="sub tals">
          <span>total:</span>
          <span class="name">${{ store.amount + 2 }}.00 </span>
        </div>
        <div class="sub btn">
          <van-button type="success" @click="checkout()"
            >Proceed to checkout</van-button
          >
          <van-button type="primary" @click="router.back()"
            >Back</van-button
          >
        </div>
      </div>
      <!-- oh sorry -->
      <div class="empty" v-if='list.length == 0'>
        <img src="../assets/empty.png" alt="" />
        <span>The shopping cart is still empty!</span>
      </div>
      <van-back-top
        style="width: 1.5rem; height: 1.5rem"
        right="1rem"
        bottom="1rem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted,watch } from "vue";
import { useRouter } from "vue-router";
import { cartStore } from "../store/modules/cart";
import { showLoadingToast, closeToast } from "vant";
const store = cartStore();
const router = useRouter();

const list = ref([]);
const total = ref(0)

onMounted(()=>{
  list.value = store.addList
})

watch(() => store.addList, 
(newVal,oldVal) => {
  store.addList = newVal
  list.value = newVal
});
watch(() => store.addTotal, 
(newVal,oldVal) => {
  store.addTotal = newVal
});

watch(() => store.amount, 
(newVal,oldVal) => {
  store.amount = newVal
});


const dlt = (goodsName,arr,num,price) => {
  console.log(2);
  // 使用 filter 方法过滤出不包含目标对象的新数组
  const newArr = arr.filter((obj) => obj.goodsName !== goodsName);
  store.addList = newArr
  store.addTotal -= num
  store.amount -= num*price
};

const plus = (price)=>{
  store.addTotal ++
  store.amount += price
}
const minus =(price)=>{
  store.addTotal --
  store.amount -= price
}

const checkout = () => {
  router.push("/checkout");
};
</script>

<style scoped lang="less">
@import url("@/style/cart.less");
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    color: rgb(182, 182, 182);
    font-size: 24px;
  }
  img {
    width: 60%;
  }
}
</style>
