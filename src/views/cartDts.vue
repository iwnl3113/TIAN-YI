<template>
  <div class="goodsDts">
    <div class="goodsList">
      <van-grid :border="false" :column-num="1" :gutter="0">
        <van-grid-item>
          <div class="item">
            <div class="back">
              <van-icon name="share" size="40" @click="router.back()" />
            </div>
            <van-image
              :src="require(`../assets/picture/${item.picFileName}`)"
            />
            <h2>{{ item.goodsName }}</h2>
            <div class="item-price">
              <span class="price">
                <div class="old">
                  {{ item.priceOld ? "$" + item.priceOld : "" }}
                </div>
                <div class="new">$ {{ item.price }}.00</div>
              </span>
            </div>
            <div class="Introduction">
              <div v-html="introdution" class="text" style="padding:0rem 1rem;"></div>
            </div>
            <div class="goodsBtn">
              <van-button
                type="primary"
                round
                @click="addCart(item, goodsList)"
              >
                <van-swipe
                  vertical
                  class="notice-swipe"
                  :autoplay="2000"
                  :touchable="false"
                  :show-indicators="false"
                >
                  <van-swipe-item><van-icon name="cart" /></van-swipe-item>
                  <van-swipe-item>Add</van-swipe-item>
                </van-swipe>
              </van-button>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, onBeforeMount, toRaw } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { cartStore } from "../store/modules/cart";
import { showSuccessToast, showFailToast } from 'vant';
const store = cartStore();
const item = store.goodsDts;

const goodsList = ref([]);

onMounted(() => {
  getDts();
  re();
});

const getDts = () => {
  goodsList.value = toRaw(store.goodsDts);
};

// Introduction

const introdution = ref("");

const re = () => {
  const inputString = item.text;
  // Split the string into an array of lines
  const lines = inputString.split("\r\n");
  // Create an empty HTML string
  let htmlString = "";
  // Iterate over the lines and build the HTML structure
  lines.forEach((line) => {
    if (line) {
      if (line.startsWith("Technical Parameters:")) {
        htmlString += "<h2>" + line + "</h2>";
      } else {
        htmlString += "<li>" + line.replace("•", "") + "</li>";
      }
    }
  });
  introdution.value = htmlString;
};
const addCart = (obj) => {
  let goodsItem = obj;
  let arr = store.addList;
  store.addTotal += 1;
  store.amount += obj.price
  const existingItem = arr.find((item) => item.id === obj.id);
  if (existingItem) {
    existingItem.quality++;
  } else {
    goodsItem.quality = 1;
    store.addList.push(obj);
  }
  showSuccessToast('The product has been successfully added to your shopping cart.');
};
</script>

<style lang="less" scoped>
@import url("../style/public.less");
.goodsDts {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.goodsList {
  h2 {
    font-size: 1.5rem !important;
  }
  .old {
    font-size: 1rem !important;
  }
  .new {
    font-size: 1.2rem !important;
  }
  .item-price{
    margin:1rem 0;
  }
  .back {
    width: 100%;
    float: right;
    i {
      transform: scaleX(-1);
      color: rgb(31, 59, 123);
    }
  }
  .goodsBtn {
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    .van-button {
      width: 100%;
    }
  }
}
.Introduction .text ul {
  color: red !important;
  /* 其他样式 */
}
.text{
}
</style>

<style scoped>
.text >>> li{
    color: rgb(142, 142, 142);
    margin: 5px 0;
}
.text >>> h2{
    margin: 1rem 0;
    color: rgb(112, 130, 155);
}
.text >>> ul{
    padding: 0.5rem 0;
}
</style>
