import axios from "axios";
import { Message, MessageBox } from "element-ui";

const fetch = axios.create({ baseURL: "/digitalCash" });

fetch.interceptors.request.use(
  config => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = `${localStorage.getItem("token")}`;
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.resCode !== 200) {
      Message({
        message: res.resMsg,
        type: "error",
        duration: 5 * 1000
      });
      if (res.resCode === 401) {
        // window.location.href =
        // 'http://irv.iresearch.com.cn/iResearchDataWeb/?m=user&a=jump&pro=46';
      } else {
        Message({
          message: res.resMsg,
          type: "error",
          duration: 5 * 1000
        });
      }
      return Promise.reject(res);
    } else {
      return response.data.data;
    }
  },
  error => {
    console.log(error);
    // router.replace('NotFound')
    switch (error.response.status) {
      case 500:
        Message({ message: "系统异常！", type: "warning" });
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default fetch;
