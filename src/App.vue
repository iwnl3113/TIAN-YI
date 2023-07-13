<template>
  <div class="app">
    <div class="header">
      <van-icon name="bars" size="30" color="gray" />
      <img src="@/assets/lgoo.png" alt="">
      <van-badge :content="0" color="#1989fa">
        <van-icon name="shopping-cart" size="30" color="rgb(236, 156, 7);" />
      </van-badge>
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<style lang="less">
@import url('@/style/app.less');
</style>
