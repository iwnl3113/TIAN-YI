<template>
  <div class="products">
    <div class="main-title">DEALS & PROMOTIONS</div>
    <div class="goodsList">
      <van-grid :border="false" :column-num="2" :gutter="5">
        <van-grid-item v-for="(item,index) in goodsList" :key="item.id">
          <div class="item">
            <van-icon name="hot" size="40" style="position: absolute; right: -10px; top: -10px; color: rgb(255, 111, 0);" />
            <van-image
              :src=item.picFileName
              @click="dts(item)"
            />
            <h2>{{ item.goodsName }}</h2>
            <div class="item-price">
              <span class="price">
                <div class="old">{{ item.priceOld?'$'+item.priceOld:'' }}</div>
                <div class="new">$ {{ item.price }}.00</div>
              </span>
              <van-button type="primary" round @click="addCart(item,goodsList)">
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
    <van-pagination
      v-model="page.currentPage"
      :total-items="page.total"
      :show-page-size="page.size"
      @change="changePage()"
    >
      <template #prev-text>
        <van-icon name="arrow-left" />
      </template>
      <template #next-text>
        <van-icon name="arrow" />
      </template>
      <template #page="{ text }">{{ text }}</template>
    </van-pagination>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted,toRaw } from "vue";
import { useRouter } from "vue-router";
import http from "../axios/index";
import { cartStore } from "../store/modules/cart";
import { showLoadingToast, showSuccessToast, closeToast } from "vant";
const store = cartStore()
const router = useRouter();

// goodslist
const goodsList = ref([]);

const getGoods = () => {
  let params = {
    page: 1,
    type: 3,
  };
  http
    .post(
      "/getGoodsListByPage?page=" + params.page + "&type=" + params.type
    )
    .then((res) => {
      goodsList.value = res.list; // 修改属性值
      page.currentPage = res.pageNum;
      page.size = res.size;
      page.total = res.total;
      closeToast()
    })
    .catch((err) => {
      console.error(err);
    });
};

const dts = (obj)=>{
  let dts = toRaw(obj)
  store.goodsDts = dts
  router.push('/goods')
}

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

onMounted(() => {
  getGoods();
});

// page
const page = reactive({
  currentPage: 1,
  total: 0,
  size: 0,
});

const changePage = () => {
  let params = {
    page: page.currentPage,
    type: 3,
  };
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: 'Loading...',
  });
  http
    .post(
      "/getGoodsListByPage?page=" + params.page + "&type=" + params.type
    )
    .then((res) => {
      goodsList.value = res.list; // 修改属性值
      page.currentPage = res.pageNum;
      page.size = res.size;
      page.total = res.total;
      closeToast()
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<style lang="less" scoped>
@import url("@/style/public.less");
@import url("@/style/pagination.less");
.products {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
