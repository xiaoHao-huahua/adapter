import Mock from 'mockjs'
import data from './data.json'
import shops from './shops.json'

Mock.mock('/api/goods',{code:0,data:data.goods})
Mock.mock('/api/ratings',{code:0,data:data.ratings})
Mock.mock('/api/info',{code:0,data:data.info})

Mock.mock(/^\/api\/shop\/\d+$/,function (options) {
    // 得到请求params参数id
  const id = options.url.substring(10)
  //找到对应的shops
  const shop = shops.find(shop => shop.id == id)
  console.log('/api/shop', options, shop || shops[0])
  //返回一个动态数据
  return Mock.mock({code:0,data:shop || shops[0]})
})