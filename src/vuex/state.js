
//保存多个组建共享状态数据的对象

export default {
  latitude:40.10038,
  longitude:116.36867,
  address:{},
  categorys:[],
  shops:[],
  user:{},
  token:localStorage.getItem('token_key' || ''),//当前用户登录标记
  goods:[],
  ratings:[],
  info:{}
}