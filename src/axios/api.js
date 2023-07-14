
import http from '../axios/index';
// 创建一个业务接口对象
const test = {
  query(params) {
    return http.post('/url', params);
  },
  test_get() {
    return http.get('/url')
  }
}

export default { test }
