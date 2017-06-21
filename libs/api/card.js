const config = require('../config')
const request = require('../utils/request')
const errors = require('../utils/errors')


/**
 * 创建卡片              createCard
 * 查询code             getCardCode
 * 查询用户微信卡包list   getUserCardList
 * 查看卡券详情           getCardDetail
 * 批量查询卡券列表       batchGetCard
 * 更新卡券信息           modifyCard
 * 删除卡券接口           deleteCard
 * 修改库存接口           modifyCardStock
 */


/**
 * 创建卡片 
 *  @return {promise} 
 *  card {
 *    card_type,
 *    base_info,
 *    advanced_info,
 *    ( 
 *      特殊字段：
 *      deal_detail，
 *      least_cost，
 *      reduce_cost
 *      default_detail,
 *      discount,
 *      gift,
 *      memberCard
 *    )
 *  }
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
      const memberCard = card.member_card || {}
      card_data = {
        card_type,
        'member_card': Object.assign({}, { base_info }, { advanced_info }, memberCard)
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
 * @param card_id 卡券ID代表一类卡券。自定义code卡券必填。
 * @param code 单张卡券的唯一标准 (必填)
 * @return {promise}
 */
exports.getCardCode = (card_id, code) => {
  const data = { card_id, code, check_consume: true }
  return request.post(config.api.GET_CARD_CODE, {
    form: JSON.stringify(data)
  })
}

/**
 * 用于获取用户卡包里的，属于该appid下所有可用卡券，包括正常状态和未生效状态。
 * @param openid 必填 需要查询的用户openid
 * @param card_id 卡券ID。不填写时默认查询当前appid下的卡券。
 * @return {promise}
 */
exports.getUserCardList = (options) => {
  return request.post(config.api.GET_USER_CARD_LIST, {
    form: JSON.stringify(options)
  })
}
/**
 * 开发者可以调用该接口查询某个card_id的创建信息、审核状态以及库存数量。
 * @param cardId
 */
exports.getCardDetail = (cardId) => {
  if (typeof cardId !== 'string') {
    return Promise.reject(errors.MISSING_PARAMS())
  }
  return request.post(config.api.GET_CARD_DETAIL, {
    form: JSON.stringify({ card_id: cardId })
  })
}
/**
 * 批量查询卡券列表
 * @param offset 查询卡列表的起始偏移量，从0开始，即offset: 5是指从从列表里的第六个开始读取。
 * @param count 需要查询的卡片的数量（数量最大50）
 * @param options 支持开发者拉出指定状态的卡券列表
 */
exports.batchGetCard = (offset = 0, count = 3, options) => {
  const status_list = options || []
  return request.post(config.api.BATCH_GET_CARD, {
    form: JSON.stringify({ offset, count, status_list })
  })
}
/**
 * 更改卡券信息接口
 * 支持更新所有卡券类型的部分通用字段及特殊卡券（会员卡、飞机票、电影票、会议门票）中特定字段的信息。
 * @param card 
 */
exports.modifyCard = (card) => {

  if (typeof card !== 'object') {
    return Promise.reject(errors.MISSING_PARAMS())
  }

  if (!card.cardId || typeof card.cardId !== 'string') {
    return Promise.reject(errors.MISSING_PARAMS('没有card_id'))
  }
  // 更新卡券cardId
  const card_id = card.cardId

  return request.post(config.api.GET_CARD_DETAIL, {
    form: JSON.stringify({ card_id })
  }).then(({ card: currentCard }) => {
    // console.log(currentCard)
    // 更新卡券数据
    const card_type = currentCard.card_type
    // 基本的卡券数据
    const base_info = card.base_info
    // 卡券高级信息
    const advanced_info = card.advanced_infoÎ
    let updateDate = {}
    switch (card_type) {
      // 团购券
      case 'GROUPON':
        const deal_detail = card.deal_detail
        updateDate = Object.assign(currentCard.groupon, base_info, advanced_info, deal_detail)
        break;
      // 代金券
      case 'CASH':
        const least_cost = card.least_cost || 0  // 代金券专用，表示起用金额（单位为分）,如果无起用门槛则填0
        const reduce_cost = card.reduce_cost || 0 // 代金券专用，表示减免金额。（单位为分）
        updateDate = Object.assign(currentCard.cash, base_info, advanced_info, deal_detail, least_cost, reduce_cost)
      // 折扣券
      case 'DISCOUNT':
        const discount = card.discount || 30 // 折扣券专用，表示打折额度（百分比）。填30就是七折
        updateDate = Object.assign(currentCard.discount, base_info, advanced_info, discount)
        break;
      // 兑换券
      case 'GIFT':
        const gift = card.gift || '' // 兑换券专用，填写兑换内容的名称
        updateDate = Object.assign(currentCard.gift, base_info, advanced_info, gift)
        break;

      // 兑换券
      case 'GENERAL_COUPON':
        const default_detail = card.default_detail || '' // 优惠券专用，填写优惠详情
        updateDate = Object.assign(currentCard.general_coupon, base_info, advanced_info, default_detail)
        break;
      case 'MEMBER_CARD':
        const memberCard = card.member_card || {}
        updateDate = {
          'member_card': Object.assign({}, { base_info }, { advanced_info }, memberCard)
        }
        break;
    }
    console.log(updateDate)
    return Promise.resolve(updateDate)
  }).then(updateDate => {
    return request.post(config.api.MODIFY_CARD, {
      form: JSON.stringify({ card: updateDate })
    })
  })
}
/**
 * 删除卡券接口允许商户删除任意一类卡券。删除卡券后，该卡券对应已生成的领取用二维码、添加到卡包JS API均会失效。 注意：如用户在商家删除卡券前已领取一张或多张该卡券依旧有效。即删除卡券不能删除已被用户领取，保存在微信客户端中的卡券。
 * @param cardId 卡券ID。 
 */
exports.deleteCard = (cardId) => {

  if (!cardId || typeof cardId !== 'string') {
    return Promise.reject(errors.MISSING_PARAMS())
  }

  return request.post(config.api.DELETE_CARD, {
    form: JSON.stringify({ card_id: cardId })
  })
}

/**
 * 调用修改库存接口增减某张卡券的库存
 * @param cardId 卡券id
 * @param {number} number  正数增加库存 100 负数减少库存 -80
 */
exports.modifyCardStock = (cardId, number) => {

  if (typeof cardId !== 'string' || typeof number !== 'number') {
    return Promise.reject(errors.MISSING_PARAMS())
  }

  let params = {}
  params['card_id'] = cardId
  let field = number > 0 ? 'increase_stock_value' : 'reduce_stock_value'
  params[field] = Math.abs(number)

  return request.post(config.api.MODIFY_CARD_STOCK, {
    form: JSON.stringify(params)
  })
}



