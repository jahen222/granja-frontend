import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueApollo from "vue-apollo";
import apolloClient from "./scripts/vue-apollo";
import Cookies from "js-cookie";
import store from "./store";
import router from "./router";
import VueRouter from "vue-router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import AsyncComputed from "vue-async-computed";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (Cookies.get("user") !== undefined) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

library.add(faCircle);

Vue.config.productionTip = false;
Vue.use(VueApollo);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(AsyncComputed);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  store,
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
