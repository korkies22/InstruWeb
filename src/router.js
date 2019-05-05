import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Sensors from "./views/Sensors.vue";
import Pump from "./views/Pump.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/sensors",
      name: "sensors",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Sensors
    },
    {
      path: "/pump",
      name: "pump",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Pump
    }
  ]
});
