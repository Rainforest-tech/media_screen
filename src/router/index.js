import Vue from "vue";
import VueRouter from "vue-router";
import Default_screen from "../views/Default_screen.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Default_screen,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
