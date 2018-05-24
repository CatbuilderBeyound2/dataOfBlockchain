import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import ViewHead from "@/components/ViewHead";
import ViewSearch from "@/components/ViewSearch";
import ViewData from "@/components/ViewData";
import ViewContent from "@/components/ViewContent";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/ViewHead",
      name: "ViewHead",
      component: ViewHead
    },
    {
      path: "/ViewSearch",
      name: "ViewSearch",
      component: ViewSearch
    },
    {
      path: "/ViewData",
      name: "ViewData",
      component: ViewData
    },
    {
      path: "/ViewContent",
      name: "ViewContent",
      component: ViewContent
    }
  ]
});
