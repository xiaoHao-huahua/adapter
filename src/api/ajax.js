import axios from "axios";
import qs from "qs";
import { Indicator,Toast,MessageBox} from "mint-ui";
import store from "../vuex/store.js";
import router from "../router/index.js";

// 创建一个新的Axios的实例(功能上的)
const instance = axios.create({
  //定义全局配置,指定请求超时的时间和路径前缀
  baseURL: "/api",
  timeout: 20000
});

//请求拦截器
instance.interceptors.request.use(config => {
  // 显示请求loading
  Indicator.open();
  //3.对请求体参数进行urlencode处理,不使用默认的json方式(后台接口不支持)
  const data = config.data;
  if (data instanceof Object) {
    config.data = qs.stringify(data);
  }
  //通过请求头携带token数据
  const token = store.state.user.token;
  
  if (token) {
    config.headers['Authorization'] = token
  } else {
    const needCheck = config.headers.needCheck
    if (needCheck) {
      throw new Error('没有登录,请登录!')
    }
  }
  return config;
});

//响应拦截器
instance.interceptors.response.use(
  response => {
    // console.log('res interceptor')
    // 隐藏请求loading
    Indicator.close();
    // return response
    // 2. 异步请求成功的数据不是response, 而是response.data
    return response.data;
  },
  error => {
    // 隐藏请求loading
    Indicator.close();
    const response = error.response;
    // 没发请求的错误
    if(!response){
      const path = router.currentRoute.path
      if(path!=='/login'){
        router.replace('/login')
        Toast(error.message)
      }
    }else{// 发了请求的错误

    if(error.response.status === 401){
      const path = router.currentRoute.path
      if(path!=='/login'){
        store.dispatch('logout')
        router.replace('/login')
        Toast(error.response.data.message || '登录失效,请重新登录')
      }
    }else if(error.response.status === 404){// status为: 404: 提示访问的资源不存在
      MessageBox('访问的资源不存在')
    }else{
      MessageBox('提示',"请求出错: " + error.message);
    }

    }
    // return Promise.reject(error)
    return new Promise(() => {}); // 返回一个pending状态的promise => 中断promie链
  }
);

export default instance;
