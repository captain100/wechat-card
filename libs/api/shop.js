const config = require('../config')
const request = require('../utils/request')
/**
 * batch add shop(location) (批量添加门店)
 * @param  {array}   shops    [shop list 门店列表]
 */
exports.batchAddShops = (shops) => {
  return request.post(config.api.CREATE_SHOP, {
    form: JSON.stringify({ location_list: shops })
  })
}

/**
 * batch get shop information (批量获取门店信息 新的接口)
 * @param  {number}   begin   [the shop list start at offset 列表起始位置]
 * @param  {number}   limit    [the quantity of list 列表数量]
 */
exports.batchGetShopsV2 = (begin = 0, limit = 20) => {
  return request.post(config.api.GET_SHOP_LIST_V2, {
    form: JSON.stringify({ begin: begin, limit: limit })
  })
}

/**
 * batch get shop information (批量获取门店信息)
 * @param  {number}   begin   [the shop list start at offset 列表起始位置]
 * @param  {number}   limit    [the quantity of list 列表数量]
 */
exports.batchGetShops = (offset = 0, count= 20) => {
  return request.post(config.api.GET_SHOP_LIST_V1, {
    form: JSON.stringify({ offset: offset, count: count })
  })
}





