import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home.vue";
import bestSell from "@/views/bestSell.vue";
import contact from "@/views/contact.vue";
import deal from "@/views/deal.vue";
import products from "@/views/products.vue";
import container from "@/views/container.vue";
import cart from "../views/shopCart.vue";
import checkout from "../views/checkout.vue";
import info from "../views/cart/info.vue";
import payment from "../views/cart/payment.vue";
import shipping from "../views/cart/shipping.vue";
import order from "../views/order.vue";
import goods from "../views/cartDts.vue";
const routes = [
  {
    path: "/",
    name: "container",
    component: container,
    children: [
      {
        path: "/",
        name: "home",
        component: home,
      },
      {
        path: "/goods",
        name: "goods",
        component: goods,
      },
      {
        path: "/bestSell",
        name: "bestSell",
        component: bestSell,
      },
      {
        path: "/contact",
        name: "contact",
        component: contact,
      },
      {
        path: "/deal",
        name: "deal",
        component: deal,
      },
      {
        path: "/products",
        name: "products",
        component: products,
      },
      {
        path: "/cart",
        name: "cart",
        component: cart,
      },
      {
        path: "/checkout",
        name: "checkout",
        redirect: "/checkout/info",
        component: checkout,
        children: [
          {
            path: "/checkout/info",
            name: "info",
            component: info,
            meta: {
              keepAlive: true, // 需要缓存
            },
          },
          {
            path: "/checkout/payment",
            name: "payment",
            component: payment,
            meta: {
              keepAlive: true, // 需要缓存
            },
          },
          {
            path: "/checkout/shipping",
            name: "shipping",
            component: shipping,
            meta: {
              keepAlive: true, // 需要缓存
            },
          },
        ],
      },
      {
        path: "/order",
        name: "order",
        component: order,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
