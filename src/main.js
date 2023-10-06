import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes/routes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

Vue.prototype.$axios = axios;

Vue.use(VueRouter);
const router = new VueRouter({
  routes: Routes
});

new Vue({
  el: "#app",
  render: h => h(App),
  router: router
});
