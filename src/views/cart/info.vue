<template>
  <div class="steps">
    <van-steps active="1" active-icon="success" active-color="#07c160">
      <van-step>Cart</van-step>
      <van-step>Information</van-step>
      <van-step>Shipping</van-step>
      <van-step>Payment</van-step>
    </van-steps>
  </div>
  <keep-alive>
    <van-form @failed="onSubmit">
    <van-cell-group inset>
      <h2>Information</h2>

      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="form.email"
        name="Email"
        label="Email"
        placeholder="Email address"
        :rules="rules.email"
      />

      <h2>Billing and Shipping address</h2>
      <van-field
        v-model="form.firstName"
        name="First name"
        label="First name"
        placeholder="First name"
        :rules="rules.first"
      />
      <van-field
        v-model="form.lastName"
        name="Last name"
        label="Last name"
        placeholder="Last name"
        :rules="rules.last"
      />

      <van-field
        v-model="form.streetAddress"
        name="Street address"
        label="Street address"
        placeholder="Street address"
        :rules="rules.streetAddress"
      />

      <!-- selection -->
      <van-field
        v-model="form.choice"
        name="Type"
        label="Type"
        placeholder="Type"
        :rules="rules.choice"
      />
      <van-field
        v-model="form.postCode"
        name="Postcode/ZIP"
        label="Postcode/ZIP"
        placeholder="Postcode/ZIP"
        :rules="rules.postcode"
      />
      <van-field
        v-model="form.stateCountry"
        name="State/County"
        label="State/County"
        placeholder="State/County"
        :rules="rules.county"
      />
      <van-field
        v-model="form.townCity"
        name="Town/City"
        label="Town/City"
        placeholder="Town/City"
        :rules="rules.city"
      />
      <van-field
        v-model="form.phone"
        name="Phone"
        label="Phone"
        placeholder="Phone"
        :rules="rules.phone"
      />
    </van-cell-group>

    <div style="margin: 16px" class="btn">
      <van-button
        round
        block
        type="success"
        native-type="submit"
        @click="onSubmit"
      >
        Continue to Shipping
      </van-button>
      <van-button round block type="primary" native-type="submit" @click="back">
        Return to cart
      </van-button>
      <span
        style="color: rgb(177, 177, 177); font-size: 12px; margin-top: 2rem"
      >
        Copyright © 2023, TIANYI Online. All rights reserved.
      </span>
    </div>
  </van-form>
  </keep-alive>
</template>

<script setup lang="js">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { validate } from 'vant';
import { showFailToast } from 'vant';
import { cartStore } from '@/store/modules/cart';


const store = cartStore()
const router = useRouter();


const form = reactive({
    email: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    choice: '',
    postCode: '',
    stateCountry: '',
    townCity: '',
    phone: ''
})



const rules = {
    email: [
        { required: true, message: 'Please enter your email address' },
        { type: 'email', message: 'Please enter a valid email address' },
    ],
    first: [
        { required: true, message: 'Please enter your first name' }
    ],
    last: [
        { required: true, message: 'Please enter your last name' }
    ],
    street: [
        { required: true, message: 'Please enter your street address' }
    ],
    choice: [
        { required: true, message: 'Please enter your choice' }
    ],
    postcode: [
        { required: true, message: 'Please enter your postcode/ZIP' }
    ],
    county: [
        { required: true, message: 'Please enter your state/county' }
    ],
    city: [
        { required: true, message: 'Please enter your town/city' }
    ],
    phone: [
        { required: true, message: 'Please enter your phone number' }
    ]
};

const onSubmit = () => {
  validateForm().then(() => {
      store.email = form.email;
      store.address = form.firstName + ',' + form.lastName +','+form.streetAddress +','+form.townCity +','+form.stateCountry +','+form.postCode
      store.params = form
      router.push('/checkout/shipping');
    }).catch(() => {
      showFailToast('Please fill in all required fields');
    });
};

const validateForm = () => {
  return new Promise((resolve, reject) => {
    for (const key in form) {
      if (rules.hasOwnProperty(key)) {
        if (!form[key]) {
          reject([{ field: key, message: rules[key][0].message }]);
          return;
        }
      }
    }
    resolve();
  });
};

const back = () =>{
    router.back()
}
</script>

<style scoped lang="less">
@import url("../../style/checkout.less");
</style>
