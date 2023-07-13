import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
createApp(App).use(router).mount("#app");
// axios.defaults.baseURL = "https://ruby-inquisitive-pike.cyclic.app/";
axios.defaults.baseURL = "http://172.16.4.110:6090/";
