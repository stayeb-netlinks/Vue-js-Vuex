import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Router from "./router";
import store from "./store";
import VueFeather from "vue-feather";

const app = createApp(App);

app.use(Router);
app.use(store);
app.component(VueFeather.name, VueFeather);
app.mount("#app");
