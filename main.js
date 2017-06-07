const WeChatCard = require('./index')

// 初试化设置
// WeChatCard.setConfig({
//   appId: 'wx577c00556617b6e6',
//   appSecret: 'e7578f5d676a280fda1925b077968505'
// })

// 三方授权 access_token
WeChatCard.setConfig({
  accessTokenService: {
    "access_token": "yLI3kxxjO_VMtpHzuWt9veMdizk5Tai1xpyVG8YTAySPWhbuova8RsHTuKAKENdjqVOHfCWdx_E-utxBu0R4l2AlbxGlamRWRXawysELO4l_kc_ZmxSCB0oroQSiyKRYUUOfAAAPPJ",
    "expires_in": 7199
  }
})



let cardinfo = {
  "card_type": "GROUPON",
  "base_info": {
    "logo_url": "http://mmbiz.qpic.cn/mmbiz/iaL1LJM1mF9aRKPZJkmG8xXhiaHqkKSVMMWeN3hLut7X7hicFNjakmxibMLGWpXrEXB33367o7zHN0CwngnQY7zb7g/0",
    "brand_name": "微信餐厅",
    "code_type": "CODE_TYPE_TEXT",
    "title": "132元双人火锅套餐",
    "color": "Color010",
    "notice": "使用时向服务员出示此券",
    "service_phone": "020-88888888",
    "description": "不可与其他优惠同享\n如需团购券发票，请在消费时向商户提出\n店内均可使用，仅限堂食",
    "date_info": {
      "type": "DATE_TYPE_FIX_TIME_RANGE",
      "begin_timestamp": parseInt((Date.now() / 1000), 10),
      "end_timestamp": parseInt((Date.now() + 24 * 60 * 60 * 1000) / 1000, 10)
    },
    "sku": {
      "quantity": 500000
    },
    "use_limit": 100,
    "get_limit": 3,
    "use_custom_code": false,
    "bind_openid": false,
    "can_share": true,
    "can_give_friend": true,
    "location_id_list": [
      123,
      12321,
      345345
    ],
    "center_title": "顶部居中按钮",
    "center_sub_title": "按钮下方的wording",
    "center_url": "www.qq.com",
    "custom_url_name": "立即使用",
    "custom_url": "http://www.qq.com",
    "custom_url_sub_title": "6个汉字tips",
    "promotion_url_name": "更多优惠",
    "promotion_url": "http://www.qq.com",
    "source": "大众点评"
  },
  "advanced_info": {
    "use_condition": {
      "accept_category": "鞋类",
      "reject_category": "阿迪达斯",
      "can_use_with_other_discount": true
    },
    "abstract": {
      "abstract": "微信餐厅推出多种新季菜品，期待您的光临",
      "icon_url_list": [
        "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sj  piby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0"
      ]
    },
    "text_image_list": [
      {
        "image_url": "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sjpiby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0",
        "text": "此菜品精选食材，以独特的烹饪方法，最大程度地刺激食 客的味蕾"
      },
      {
        "image_url": "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sj piby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0",
        "text": "此菜品迎合大众口味，老少皆宜，营养均衡"
      }
    ],
    "time_limit": [
      {
        "type": "MONDAY",
        "begin_hour": 0,
        "end_hour": 10,
        "begin_minute": 10,
        "end_minute": 59
      },
      {
        "type": "HOLIDAY"
      }
    ],
    "business_service": [
      "BIZ_SERVICE_FREE_WIFI",
      "BIZ_SERVICE_WITH_PET",
      "BIZ_SERVICE_FREE_PARK",
      "BIZ_SERVICE_DELIVER"
    ]
  },
  "deal_detail": "以下锅底2选1（有菌王锅、麻辣锅、大骨锅、番茄锅、清补 凉锅、酸菜鱼锅可选）：\n大锅1份 12元\n小锅2份 16元 "
}

// 测试创建 卡券
// WeChatCard.card.createCard(cardinfo)
//   .then(success => console.log('创建卡券成功', success))
//   .catch(e => console.log('创建卡券失败', e))

// 查询单个卡券信息 
// WeChatCard.card.getCardDetail('phrZTw2bjrQo60ArLXib0BwiEuAE')
//   .then(cardinfo => {
//     console.log('卡券详情', cardinfo)
//   }).catch(e => console.log('查询失败', e))

// 批量查询卡券状态
WeChatCard.card.batchGetCard(0, 10, [])
  .then(list => console.log('请求数据成功', list))
  .catch(e => console.log('请求数据失败', e))

const updateCard = {
  cardId: 'phrZTw7GQ_dwdmhTreePOFSuJORo',
  "card_type": "GROUPON",
  "base_info": {
    "logo_url": "",
    "brand_name": "微信餐厅",
    "code_type": "CODE_TYPE_TEXT",
    "title": "132元双人火锅套餐",
    "color": "Color010",
    "notice": "使用时向服务员出示此券",
    "service_phone": "020-88888888",
    "description": "不可与其他优惠同享\n如需团购券发票，请在消费时向商户提出\n店内均可使用，仅限堂食",
    "date_info": {
      "type": "DATE_TYPE_FIX_TIME_RANGE",
      "begin_timestamp": parseInt((Date.now() / 1000), 10),
      "end_timestamp": parseInt((Date.now() + 24 * 60 * 60 * 1000) / 1000, 10)
    },
    "sku": {
      "quantity": 500000
    },
    "use_limit": 100,
    "get_limit": 3,
    "use_custom_code": false,
    "bind_openid": false,
    "can_share": true,
    "can_give_friend": true,
    "location_id_list": [
      123,
      12321,
      345345
    ],
    "center_title": "顶部居中按钮",
    "center_sub_title": "按钮下方的wording",
    "center_url": "www.qq.com",
    "custom_url_name": "立即使用",
    "custom_url": "http://www.qq.com",
    "custom_url_sub_title": "6个汉字tips",
    "promotion_url_name": "更多优惠",
    "promotion_url": "http://www.qq.com",
    "source": "大众点评"
  },
  "advanced_info": {
    "use_condition": {
      "accept_category": "鞋类",
      "reject_category": "阿迪达斯",
      "can_use_with_other_discount": true
    },
    "abstract": {
      "abstract": "微信餐厅推出多种新季菜品，期待您的光临",
      "icon_url_list": [
        "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sj  piby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0"
      ]
    },
    "text_image_list": [
      {
        "image_url": "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sjpiby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0",
        "text": "此菜品精选食材，以独特的烹饪方法，最大程度地刺激食 客的味蕾"
      },
      {
        "image_url": "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sj piby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0",
        "text": "此菜品迎合大众口味，老少皆宜，营养均衡"
      }
    ],
    "time_limit": [
      {
        "type": "MONDAY",
        "begin_hour": 0,
        "end_hour": 10,
        "begin_minute": 10,
        "end_minute": 59
      },
      {
        "type": "HOLIDAY"
      }
    ],
    "business_service": [
      "BIZ_SERVICE_FREE_WIFI",
      "BIZ_SERVICE_WITH_PET",
      "BIZ_SERVICE_FREE_PARK",
      "BIZ_SERVICE_DELIVER"
    ]
  },
  "deal_detail": "啊哈哈"
}


// 修改卡券信息
// WeChatCard.card.modifyCard(updateCard)
//   .then(result => console.log('修改成功', result))
//   .catch(e => console.log('修改失败', e))

// 删除卡券
// WeChatCard.card.deleteCard('phrZTw-QikDfzbJyAz7xpPcQqgpU')
//   .then(success => console.log('删除成功', success))
//   .catch(e => console.log('删除失败', e))


// 增加库存
WeChatCard.card.modifyCardStock('phrZTw8aEMrgEPI9g9DCfP-NvPRQ', 100)
  .then(result => console.log('修改成功', result))
  .catch(e => console.log('修改失败', e))

// 减少库存
WeChatCard.card.modifyCardStock('phrZTw8aEMrgEPI9g9DCfP', -1)
  .then(result => console.log('修改成功', result))
  .catch(e => console.log('修改失败', e))


