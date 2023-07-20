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

        <!-- selection -->
        <van-field
          v-model="form.postCode"
          name="Postcode/ZIP"
          label="Postcode/ZIP"
          placeholder="Postcode/ZIP"
          :rules="rules.postcode"
        />
        <!-- city -->
        <van-field
          v-model="form.stateCountry"
          is-link
          readonly
          name="area"
          label="State/Country"
          placeholder="State/Country"
          @click="showArea = true"
          label-align="left"
        />
        <van-popup v-model:show="showArea" position="bottom">
          <van-cascader
            v-model="form.stateCountry"
            title="Please select your Country"
            :options="columns"
            @close="show = false"
            @finish="onFinish"
            :field-names="customFieldName"
            placeholder="select"
          />
        </van-popup>


        <van-field
          v-model="form.townCity"
          name="Town/City"
          label="Town/City"
          placeholder="Town/City"
          :rules="rules.city"
        />
        <van-field
          v-model="form.streetAddress"
          name="Street address"
          label="Street"
          placeholder="Street address"
          :rules="rules.street"
        />
        <!-- phone Code -->
        <van-field
          v-model="form.phoneCode"
          is-link
          name="phoneCode"
          label="Phone Code"
          placeholder="phone code"
          @click="showCode = true"
          :rules="rules.phoneCode"
        />
        <van-popup v-model:show="showCode" position="bottom">
          <van-area
            :columns="phoneCode"
            @confirm="onConfirmCode"
            @cancel="showCode = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
          />
        </van-popup>

        
        <van-field
          v-model="form.phone"
          name="Phone"
          label="Phone Num"
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
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          @click="back"
        >
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

<script setup>
import { ref, reactive, toRefs, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import { showFailToast } from "vant";
import { cartStore } from "@/store/modules/cart";
import country from "@/utils/country.json";
import code from "@/utils/countryCode.json";

const store = cartStore();
const router = useRouter();

const form = reactive({
  email: "",
  firstName: "",
  lastName: "",
  streetAddress: "",
  postCode: "",
  stateCountry: "",
  townCity: "",
  phone: "",
  phoneCode: "",
});

const rules = {
  email: [
    { required: true, message: "Please enter your email address" },
    {
      validator: (val) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
      message: "Please enter a valid email address",
    },
  ],
  first: [
    { required: true, message: "Please enter your first name" },
    {
      validator: (val) => /^[a-zA-Z]+$/.test(val),
      message: "Only English letters are allowed for the first name",
    },
  ],
  last: [
    { required: true, message: "Please enter your last name" },
    {
      validator: (val) => /^[a-zA-Z]+$/.test(val),
      message: "Only English letters are allowed for the last name",
    },
  ],
  street: [{ required: true, message: "Please enter your street address" }],
  postcode: [{ required: true, message: "Please enter your postcode/ZIP" }],
  country: [{ required: true, message: "Please enter your state/country" }],
  city: [{ required: true, message: "Please enter your town/city" }],
  phoneCode: [{ required: true, message: "Please enter your street address" }],
  phone: [
    { required: true, message: "Please enter your phone number" },
    {
      validator: (val) => /^\d{1,15}$/.test(val),
      message: "Please enter current phone number",
    },
  ],
};

onMounted(() => {
  // area
  getArea();
  // code
  phoneCode.value = code.map((item) => {
    return { text: item.en + " : " + item.code, value: item.code };
  });
});

// area
const columns = ref([]);
const showArea = ref(false);
const onFinish = ({ selectedOptions }) => {
  showArea.value = false;
  // 将 Proxy 对象转换为普通对象
  const city = selectedOptions.map((item) => {
    return item ? JSON.parse(JSON.stringify(item)) : null;
  });
  const nameEnArray = city.map((item) => (item ? item.name_en : null)); // 提取 name_en 属性
  const result = nameEnArray.filter(Boolean).join("/"); // 过滤掉为 null 的值，并用斜杠拼接
  form.stateCountry = result;
};
const customFieldName = {
  text: "name_en",
  value: "name_en",
  children: "childrens",
};

const getArea = () => {
  let totalArr = country.map((item) => item.childrens);
  let sedArr = totalArr.map((subArray) => [...subArray]).flat();
  function removeChildrenFromLastLevel(obj) {
    if (Array.isArray(obj.childrens) && obj.childrens.length > 0) {
      obj.childrens.forEach((child) => removeChildrenFromLastLevel(child));
    } else {
      delete obj.childrens;
    }
  }
  sedArr.forEach(obj => removeChildrenFromLastLevel(obj));
  columns.value = sedArr;
};

// phone Code
const phoneCode = ref([]);
const showCode = ref(false);
const onConfirmCode = ({ selectedOptions }) => {
  showCode.value = false;
  form.phoneCode = selectedOptions[0].text;
};

const onSubmit = () => {
  validateForm()
    .then(() => {
      store.email = form.email;
      store.address =
        form.firstName +
        "," +
        form.lastName +
        "," +
        form.streetAddress +
        "," +
        form.townCity +
        "," +
        form.stateCountry +
        "," +
        form.postCode;
      form.phone = form.phoneCode + "-" + form.phone;
      store.params = form;
      router.push("/checkout/shipping");
    })
    .catch(() => {
      showFailToast("Please fill in all required fields");
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

const back = () => {
  router.back();
};
</script>

<style scoped lang="less">
@import url("../../style/checkout.less");
:deep(.van-cascader__header){
  color: gray;
}
:deep(.van-tabs__wrap){
  background-color: #fff;
}
:deep(.van-cascader__option){
  color: rgb(37, 37, 37);
  font-size: 16px;
}
:deep(.van-cascader__header){
  background-color: #fff;
}
:deep(.van-popup--bottom){
  background-color: #fff;
}
</style>
