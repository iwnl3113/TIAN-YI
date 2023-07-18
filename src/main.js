import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import { Pagination } from 'vant';
import "vant/lib/index.css";
import pinia from "@/store/index";
// pinia数据持久化
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
app.use(store).use(router).use(Vant)
app.use(pinia)
app.use(Pagination);
app.mount("#app");
