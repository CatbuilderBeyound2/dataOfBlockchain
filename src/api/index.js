import fetch from "@/utils/fetch";

import apiMap from "./apiMap";

//生成接口
const _createApi = () => {
  return Object.keys(apiMap).reduce((acc, name) => {
    acc[name] = params => {
      return fetch({
        url: apiMap[name],
        ...params
      });
    };
    return acc;
  }, {});
};
export default _createApi();
