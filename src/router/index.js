import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home.vue";
import bestSell from "@/views/bestSell.vue";
import contact from "@/views/contact.vue";
import deal from "@/views/deal.vue";
import products from "@/views/products.vue";
import container from "@/views/container.vue";
const routes = [
  {
    path: "/",
    name: "container",
    component: container,
    children: [
      {
        path: "/home",
        name: "home",
        component: home,
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
