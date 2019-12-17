import ajax from './ajax.js'





//获取位置信息
export const reqAddress = (longitude, latitude) => ajax(`/position/${latitude},${longitude}`) 

// 获取食品列表
export const reqCategorys = ()=> ajax('/index_category')

// 获取商铺位置
export const reqShops = ({latitude,longitude}) => ajax('/shops',{params:{latitude,longitude}} )

// 4. 发送短信验证码
export const reqSendCode = (phone) => ajax(`/sendcode?phone=${phone}`)

//用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) => ajax.post('/login_pwd',{name,pwd,captcha})

// 6. 手机号验证码登陆
export const reqSmsLogin = ({phone,code}) => ajax.post('/login_sms',{phone,code})

// 7. 自动登陆
export const reqAutoLogin = () => ajax.get('/auto_login')


// 8.获取goods
export const reqGoods = () => ajax('/goods')

// 9.获取ratings
export const reqRatings = () => ajax('/ratings')

// 10.获取info
export const reqInfo = () => ajax('/info')