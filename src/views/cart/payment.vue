<template>
    <div class="steps">
        <van-steps active="3" active-icon="success" active-color="#07c160">
            <van-step>Cart</van-step>
            <van-step>Information</van-step>
            <van-step>Shipping</van-step>
            <van-step>Payment</van-step>
        </van-steps>
    </div>
    <van-form @failed="onFailed">
        <van-cell-group inset>
            <!-- 通过 validator 进行函数校验 -->
            <van-field v-bind="form.first" name="First name" label="Contact"
                :rules="[{ required: true, message: 'This value is required' }]" />
            <van-field v-bind="form.last" name="Last name" label="Address"
                :rules="[{ required: true, message: 'This value is required' }]" />
            <van-field v-bind="form.last" name="Last name" label="Method"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <h2>Payment</h2>
            <h4>
                All transactions are secure and encrypted. </h4>
            <div class="delivery">
                <div class="item">Cash on delivery</div>
                <div class="item">Pay with cash upon delivery</div>
            </div>
            <van-field style="border: 1px solid rgb(211, 211, 211);" v-model="message" rows="1"
                :autosize="{ minHeight: 50 }" label="notes:" type="textarea"
                placeholder="Notes about your order,e.g.special notes for delivery.(optional)" />

            <div class="tip-2">
                Your personal data will be used to process your order, support your experience throughout this website, and
                for other purposes described in our
                <span style="color: rgb(9, 181, 255);">
                    privacy policy.
                </span>
            </div>
        </van-cell-group>

        <div style="margin: 16px" class="btn">
            <van-button round block type="success" native-type="submit" @click="next"> Complete Order </van-button>
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
import { showLoadingToast, closeToast } from 'vant';
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

const onFailed = () => {
    console.log(123);
}


const next = () => {
    const toast = showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: 'Loading...',
        position: 'top',
    });
    let second = 3;
    const timer = setInterval(() => {
        second--;
        clearInterval(timer);
        closeToast();
        router.push('/order')
    }, 1000);
}
const back = () => {
    router.back()
}

</script>

<style scoped lang="less">
@import url("../../style/checkout.less");
</style>
