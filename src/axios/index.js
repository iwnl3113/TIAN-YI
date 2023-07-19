//引入 axios
import axios from "axios";
import { showFailToast } from "vant";

const http = axios.create({
  baseURL: "http://121.41.73.253:8081/",
  timeout: 50000,
});

// 数据请求拦截
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 返回响应数据拦截
http.interceptors.response.use(
  (res) => {
    const data = res.data;
    // 状态码为 2xx 范围时都会调用该函数，处理响应数据
    if (res.status === 200) {
      const code = data.code;
      return Promise.resolve(data);
    }
  },
  (error) => {
    if (error.response.status) {
      // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
      switch (error.response.status) {
        case 404:
          showFailToast(" not found path ! ");
          break;
        case 502:
          showFailToast("error !");
          break;
        default:
          showFailToast(" not found ");
          break;
      }
    }
    return Promise.reject(error);
  }
);
//这是一位大佬指点的方法，更加简单
export default http;
// 这是我原来的写法。
// post 请求方法
// export const post = (url, params) => {
//  return new Promise((resolve, reject) => {
//    http.post(url, params).then(res => {
//      resolve(res);
//    }).catch(error => {
//      reject(error);
//   })
//  });
//}
// get 请求方法
//export const get = (url) => {
//  return new Promise((resolve, reject) => {
//    http.get(url).then(res => {
//      resolve(res);
//    }).catch(error => {
//      reject(error);
//    })
//  });
//}
