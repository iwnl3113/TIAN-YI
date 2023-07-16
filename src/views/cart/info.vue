<template>
    <div class="steps">
        <van-steps active="1" active-icon="success" active-color="#07c160">
            <van-step>Cart</van-step>
            <van-step>Information</van-step>
            <van-step>Shipping</van-step>
            <van-step>Payment</van-step>
        </van-steps>
    </div>
    <van-form @failed="onFailed">
        <van-cell-group inset>
            <h2>Information</h2>

            <!-- 通过 validator 进行函数校验 -->
            <van-field v-model="form.email" name="Email" label="Email" placeholder="Email address"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <h2>Billing and Shipping address</h2>
            <van-field v-model="form.first" name="First name" label="First name" placeholder="First name"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <van-field v-model="form.last" name="Last name" label="Last name" placeholder="Last name"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <van-field v-model="form.street" name="Street address" label="Street address" placeholder="Street address"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <!-- selection -->
            <van-field v-model="form.choice" name="type" label="choice" placeholder="Apartment,suite,unit,etc.(optional)"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <van-field v-model="form.postcode" name="type" label="type" placeholder="Postcode/ZIP"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <van-field v-model="form.county" name="type" label="State/County" placeholder="State/County"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <van-field v-model="form.city" name="type" label="Town/City" placeholder="Town/City"
                :rules="[{ required: true, message: 'This value is required' }]" />

            <van-field v-model="form.phone" name="Phone" label="Phone" placeholder="Phone"
                :rules="[{ required: true, message: 'This value is required' }]" />
        </van-cell-group>

        <div style="margin: 16px" class="btn">
            <van-button round block type="success" native-type="submit" @click="next"> Continue to Shipping </van-button>
            <van-button round block type="primary" native-type="submit" @click="back"> Return to cart </van-button>
            <span style="color: rgb(177, 177, 177); font-size: 12px; margin-top: 2rem;">
                Copyright © 2023, TIANYI Online. All rights reserved.
            </span>
        </div>
    </van-form>
</template>

<script setup lang="js">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from "vue-router";
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

const next = () => {
    router.push('/checkout/shipping')
}

const back = () =>{
    router.back()
}

const onFailed = () => {
    console.log(123);
}

</script>

<style scoped lang="less">
@import url("../../style/checkout.less");
</style>
