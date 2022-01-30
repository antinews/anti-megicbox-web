import { createApp } from "vue";
import App from "./App.vue";
const vue = createApp(App);

import "@/styles/index.scss"; // global styles

import router from "./router";
import "./router/permission"; // permission control
vue.use(router).mount("#app");

import store from "./store";
vue.use(store);

// vue3.x + ElementPlus
import ElementPlus from "./plugins/element";
vue.use(ElementPlus);

import GlobalProperty from "./plugins/global-property";
vue.use(GlobalProperty);

import Icon from "@/icons";
vue.use(Icon);
