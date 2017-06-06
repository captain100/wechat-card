const config = require('../config')
const request = require('../utils/request')
const errors = require('../utils/errors')
const Promise = require('promise')


/**
 * 创建卡片 creatCard
 * 查询code getCardCode
 * 
 */


/**
 * 创建卡片 
 *  
 */
exports.createCard = (card) => {
  if (typeof card !== 'object') {
    return Promise.reject(errors.MISSING_PARAMS)
  }
  // 卡券的类型
  const card_type = card.card_type
  // 基本的卡券数据
  const base_info = card.base_info
  // 卡券高级信息
  const advanced_info = card.advanced_info

  let card_data = {}
  switch (card_type) {
    // 团购券
    case 'GROUPON':
      const deal_detail = card.deal_detail
      card_data = {
        card_type,
        groupon: {
          base_info,
          advanced_info,
          deal_detail
        }
      }
      break;
    // 代金券
    case 'CASH':
      const least_cost = card.least_cost || 0  // 代金券专用，表示起用金额（单位为分）,如果无起用门槛则填0
      const reduce_cost = card.reduce_cost || 0 // 代金券专用，表示减免金额。（单位为分）
      card_data = {
        card_type,
        cash: {
          base_info,
          advanced_info,
          least_cost,
          reduce_cost
        }
      }
    // 折扣券
    case 'DISCOUNT':
      const discount = card.discount || 30 // 折扣券专用，表示打折额度（百分比）。填30就是七折
      card_data = {
        card_type,
        discount: {
          base_info,
          advanced_info,
          discount
        }
      }
      break;
    // 兑换券
    case 'GIFT':
      const gift = card.gift || '' // 兑换券专用，填写兑换内容的名称
      card_data = {
        card_type,
        gift: {
          base_info,
          advanced_info,
          gift
        }
      }
      break;

    // 兑换券
    case 'GENERAL_COUPON':
      const default_detail = card.default_detail || '' // 优惠券专用，填写优惠详情
      card_data = {
        card_type,
        general_coupon: {
          base_info,
          advanced_info,
          default_detail
        }
      }
      break;
    case 'MEMBER_CARD':
      const member_card = card.member_card || {}
      card_data = {
        member_card: {
          base_info,
          advanced_info,
          member_card
        }
      }
      break;
  }

  // 创建卡券
  return request.post(config.api.CREATE_CARD, {
    form: JSON.stringify({ card: card_data })
  })
}

/**
 * 查询code接口可以查询当前code是否可以被核销并检查code状态。当前可以被定位的状态为正常、已核销、转赠中、已删除、已失效和无效code
 */
exports.getCardCode = (card_id, code) => {
  const data = { card_id, code, check_consume: true }
  return request.post(config.api.GET_CARD_CODE, {
    form:JSON.stringify(data)
  })
}