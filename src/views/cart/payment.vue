<template>
  <div class="steps">
    <van-steps active="3" active-icon="success" active-color="#07c160">
      <van-step>Cart</van-step>
      <van-step>Information</van-step>
      <van-step>Shipping</van-step>
      <van-step>Payment</van-step>
    </van-steps>
  </div>
  <van-form @failed="onSubmit">
    <van-cell-group inset>
      <!-- 通过 validator 进行函数校验 -->
      <van-field v-model="store.email" name="email name" label="Contact" readonly />
      <van-field v-model="store.address" name="address name" label="Address" readonly />
      <van-field v-model="method" name="method name" label="Method" readonly />

      <h2>How do you want to pay?</h2>
      <h4>All transactions are secure and encrypted.</h4>
      <div style="margin: 1rem 0">
        <van-radio-group v-model="card.cardType" direction="horizontal">
          <van-radio name="visa">
            <div class="pay"><img src="../../assets/visa.png" alt="" /></div>
          </van-radio>
          <van-radio name="masterCard">
            <div class="pay">
              <img src="../../assets/masterCard.png" alt="" />
            </div>
          </van-radio>
          <van-radio name="americanExpress">
            <div class="pay">
              <img src="../../assets/ae.png" alt="" style="width: 60px; height: 50px" />
            </div>
          </van-radio>
        </van-radio-group>
      </div>

      <van-field label-align="top" v-model="card.cardHolderName" name="cardName" label="Cardholder's Name" placeholder=""
        :rules="rules.name" />
      <van-field label-align="top" v-model="card.cardNumber" name="number" label="Card Number" placeholder=""
        :rules="rules.number" />

      <van-field label-align="top" v-model="card.expirationDate" is-link readonly name="expirationDate"
        label="Expriation date" placeholder="DD/MM/YY" @click="showPicker = true" />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker title="Expriation date" @confirm="onConfirm" @cancel="showPicker = false"
          confirm-button-text="confirm" cancel-button-text="cancel" />
      </van-popup>

      <van-field label-align="top" v-model="card.cvc" name="cardName" label="CVC" placeholder="123" :rules="rules.cvc" />

      <van-field style="border: 1px solid rgb(211, 211, 211); margin-top: 1rem" v-model="message" rows="1"
        :autosize="{ minHeight: 50 }" label="Notes:" type="textarea"
        placeholder="Notes about your order,e.g.special notes for delivery.(optional)" />

      <div class="tip-2" style="margin-top: 1rem">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our
        <span style="color: rgb(9, 181, 255)"> privacy policy. </span>
      </div>
    </van-cell-group>

    <div style="margin: 16px" class="btn">
      <van-button round block type="success" native-type="submit" @click="onSubmit">
        Complete Order
      </van-button>
      <van-button round block type="primary" native-type="submit" @click="back">
        Return to information
      </van-button>
      <span style="color: rgb(177, 177, 177); font-size: 12px; margin-top: 2rem">
        Copyright © 2023, TIANYI Online. All rights reserved.
      </span>
    </div>
  </van-form>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { showLoadingToast, closeToast } from "vant";

import { showFailToast } from "vant";
import { cartStore } from "@/store/modules/cart";
import http from "../../axios/index";
const store = cartStore();
const router = useRouter();
const card = reactive({
  cardType: "",
  cardHolderName: "",
  cardNumber: "",
  expirationDate: ["2023", "01", "01"],
  cvc: "",
});
const message = ref("");
const rules = {
  name: [
    {
      validator: (val) => /^[a-zA-Z]+$/.test(val),
      message: "Only English letters are allowed",
    },
    { required: true, message: "Please enter your Cardholder`s Name" },
  ],
  number: [{ required: true, message: "Please enter your Card Number" }],
  expirationDate: [{ required: true, message: "Please enter Expriation date" }],
  cvc: [
    { required: true, message: "Please enter your cvc" },
    {
      validator: (val) => /^\d{3,4}$/.test(val),
      message: "CVC (Card Verification Code) is a 3 to 4 digits number.",
    },
  ],
};

const method = ref("Shipping Cost");

// 日期
const showPicker = ref(false);
const onConfirm = ({ selectedValues }) => {
  card.expirationDate = selectedValues.join("/");
  showPicker.value = false;
};

// submit
const onSubmit = () => {
  validateForm()
    .then(() => {
      let oldparams = store.params;
      let newparams = { ...oldparams, ...card };
      http
        .post("/submitPayment", newparams)
        .then((res) => {
          showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: "Loading...",
          });
          let second = 2;
          const timer = setInterval(() => {
            second--;
            if (second === 0) {
              clearInterval(timer);
              closeToast();
              router.push("/order");
            }
          }, 1000);
        })
        .catch((err) => {
          showFailToast("Please fill in all required fields");
          console.error(err);
        });
    })
    .catch(() => { });
};

const validateForm = () => {
  return new Promise((resolve, reject) => {
    for (const key in card) {
      if (rules.hasOwnProperty(key)) {
        if (!card[key]) {
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

.van-radio-group {
  display: flex;
  justify-content: space-between;
}

.pay {
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    height: 80px;
    width: 80px;
  }
}
</style>
