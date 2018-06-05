// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// import 'element-ui/lib/theme-chalk/index.css' 自定义element-ui主题

import "./style/common.css";
import "./style/theme/index.css";
import "./style/index.less";
import "./style/nprogress.css";
import "./style/reset.css";

// echarts组件

import ECharts from "vue-echarts/components/ECharts";

// import ECharts modules manually to reduce bundle size
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";

// register component to use
Vue.component("chart", ECharts);

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
