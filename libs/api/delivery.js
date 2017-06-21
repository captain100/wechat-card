// 投放卡券
const config = require('../config')
const errors = require('../utils/errors')
const request = require('../utils/request')

/**
 * 买单接口说明
 * 创建卡券之后，开发者可以通过设置微信买单接口设置该card_id支持微信买单功能。值得开发者注意的是，设置买单的card_id必须已经配置了门店，否则会报错。
 * @param cardId {string}
 */
exports.paycell = (cardId) => {
  return request.post(config.api.SET_PAYCELL, {
    form: JSON.stringify({ card_id: cardId, is_open: true })
  })
}
/**
 * 设置自助核销接口
 * 创建卡券之后，开发者可以通过设置微信买单接口设置该card_id支持自助核销功能。值得开发者注意的是，设置自助核销的card_id必须已经配置了门店，否则会报错。
 */
exports.selfconsumecell = (cardId) => {
  return request.post(config.api.SET_SELFSONSUMECELL, {
    form: JSON.stringify({ card_id: cardId, is_open: true })
  })
}