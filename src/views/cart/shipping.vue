<template>
    <div class="steps">
        <van-steps active="2" active-icon="success" active-color="#07c160">
            <van-step>Cart</van-step>
            <van-step>Information</van-step>
            <van-step>Shipping</van-step>
            <van-step>Payment</van-step>
        </van-steps>
    </div>
    <van-form @failed="onFailed" ref="formRef">
        <van-cell-group inset>
            <!-- 通过 validator 进行函数校验 -->
            <van-field v-model="store.email" name="First name" label="Contact" />
            <van-field v-model="store.address" rows="1" readonly 
                :autosize="{ minHeight: 50 }" label="notes:" type="textarea"/>
            <h2>Shipping method</h2>
            <van-field name="radio">
                <template #input>
                    <van-radio-group v-model="checked" direction="horizontal">
                        <van-radio name="1">
                            Shipping Cost:
                        </van-radio>
                        <span style="margin-left: 5rem;
                        color: rgb(0, 56, 91);
                        font-size: 16px;font-weight: bolder;">$2.00</span>
                    </van-radio-group>
                </template>
            </van-field>

        </van-cell-group>

        <div style="margin: 16px" class="btn">
            <van-button round block type="success" native-type="submit" @click="next"> Continue to payment </van-button>
            <van-button round block type="primary" native-type="submit" @click="back"> Return to information </van-button>
            <span style="color: rgb(177, 177, 177); font-size: 12px; margin-top: 2rem;">
                Copyright © 2023, TIANYI Online. All rights reserved.
            </span>
        </div>
    </van-form>
</template>

<script setup lang="js">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { cartStore } from '@/store/modules/cart';
const store= cartStore()
const router = useRouter();
const form = reactive({
    email: '',
    first: '',
    last: '',
    street: '',
    choice: '',
    postcode: '',
    county: '',
    city: '',
    phone: ''
})

// radio
const checked = ref('1');

// form
const formRef = ref(null)
const onFailed = () => {
    
}
const next = () => {
    router.push('/checkout/payment')
}
const back = () => {
    router.back()
}

</script>

<style scoped lang="less">
@import url("../../style/checkout.less");
</style>
