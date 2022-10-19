import Vue from "vue";
import VueRouter from "vue-router";
import Default_screen from "../views/DefaultScreen.vue";
import PickScreen from "../views/PickScreen";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: PickScreen,
  },
  {
    path: "/default-screen",
    name: "default_screen",
    component: Default_screen,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
