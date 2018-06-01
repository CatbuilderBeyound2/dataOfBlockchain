import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const index = () => import("@/pages/index");
export default new Router({
  routes: [
    {
      path: "/",
      component: index,
      children: [
        {
          path: "search",
          component: index
        },
        {
          path: "notice",
          component: index
        }
      ]
    },
    {
      path: "/login",
      component: index
    }
  ]
});
