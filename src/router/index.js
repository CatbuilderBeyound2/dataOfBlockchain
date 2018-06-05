import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const index = () => import("@/pages/index");
const noticeList = () => import("@/pages/notice/noticeList");
export default new Router({
  routes: [
    {
      path: "/",
      component: index,
      meta: {
        hideRouterView: true
      },
      children: [
        {
          path: "search",
          component: index
        },
        {
          path: "notice",
          component: noticeList
        }
      ]
    },
    {
      path: "/login",
      component: index
    }
  ]
});
