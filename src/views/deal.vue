<template>
  <div class="products">
    <div class="main-title">
      DEALS & PROMOTIONS
    </div>
    <div class="goodsList">
      <van-grid :border="false" :column-num="2" :gutter="5">
        <van-grid-item v-for="i in 7">
          <div class="item">
            <van-icon name="discount" size="40" style="position: absolute; right: -10px; top: -10px; color: rgba(255, 0, 0, 0.898);" />
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
                  <van-swipe-item><van-icon name="cart" /></van-swipe-item>
                  <van-swipe-item>Add</van-swipe-item>
                </van-swipe>
              </van-button>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <van-pagination v-model="page.currentPage" :total-items="page.total" :show-page-size="page-size">
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
  import { ref, reactive, toRefs, onMounted } from "vue";
  import { useRouter } from "vue-router";
  const router = useRouter();

  // page
  const page = reactive({
    currentPage:1,
    total:6,
    size:5,
  })
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
