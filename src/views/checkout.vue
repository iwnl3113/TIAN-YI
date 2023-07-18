<template>
  <div class="checkout">
    <div class="summary">
      <div class="title">
        <van-icon name="cart-o" size="30" color="#1989fa" />
        <span style="margin-left: 0.2rem">Show order summary 》</span>
      </div>
      <div class="total">${{ store.amount + 2 }}.00</div>
    </div>
    <div class="form">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { cartStore } from '@/store/modules/cart';
const store = cartStore()
//  address
const searchResult = ref([]);
const onSave = () => showToast('save');
const onDelete = () => showToast('delete');
const onChangeDetail = (val) => {
    if (val) {
        searchResult.value = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
        ];
    } else {
        searchResult.value = [];
    }
};

// rules

const value2 = ref('');

// 校验函数返回 true 表示校验通过，This value is required 表示不通过
const validator = (val) => /1\d{10}/.test(val);
// 校验函数可以直接返回一段错误提示
const validatorMessage = (val) => `${val} 不合法，请重新输入`;

// selection
const result = ref('');
const showPicker = ref(false);
const columns = [
    { text: '杭州', value: 'Hangzhou' },
    { text: '宁波', value: 'Ningbo' },
    { text: '温州', value: 'Wenzhou' },
    { text: '绍兴', value: 'Shaoxing' },
    { text: '湖州', value: 'Huzhou' },
];

const onConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    showPicker.value = false;
};
</script>

<style scoped lang="less">
@import url("../style/checkout.less");
</style>
