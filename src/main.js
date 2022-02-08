import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import router from "./router";

createApp(App).use(router).use(store).mount("#app");
