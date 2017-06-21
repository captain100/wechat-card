const WeChatCard = require('../index')
const _config = require('../libs/config')
WeChatCard.setConfig({
  appId: 'wx66e59f0e402601f3',
  appSecret: '184897070ca93a0e563cb6b79962a98c'
})

// 小云笔记
//  appId: 'wxb4fb29266130bb85',
//  appSecret: '675f1cd7edfcaba17b987c44c83e0a6b'

// 李浩公众号
// wx7003da87224dd76a
// c52a86f5511bd26cee0bed8e81119d97

let memberCardInfo = {
  "card_type": "MEMBER_CARD",
  "base_info": {
    "logo_url": "http://mmbiz.qpic.cn/mmbiz/iaL1LJM1mF9aRKPZ/0",
    "brand_name": "海底捞",
    "code_type": "CODE_TYPE_TEXT",
    "title": "海底捞会员卡",
    "color": "Color010",
    "notice": "使用时向服务员出示此券",
    "service_phone": "020-88888888",
    "description": "不可与其他优惠同享",
    "date_info": {
      "type": "DATE_TYPE_PERMANENT"
    },
    "sku": {
      "quantity": 50000000
    },
    "get_limit": 3,
    "use_custom_code": false,
    "can_give_friend": true,
    "location_id_list": [
      123,
      12321
    ],
    "custom_url_name": "立即使用",
    "custom_url": "http://weixin.qq.com",
    "custom_url_sub_title": "6个汉字tips",
    "promotion_url_name": "营销入口1",
    "promotion_url": "http://www.qq.com",
    "need_push_on_view": true
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
  "member_card": {
    "background_pic_url": "https://mmbiz.qlogo.cn/mmbiz/",
    "supply_bonus": true,
    "supply_balance": false,
    "prerogative": "test_prerogative",
    "auto_activate": true,
    "custom_field1": {
      "name_type": "FIELD_NAME_TYPE_LEVEL",
      "url": "http://www.qq.com"
    },
    "activate_url": "http://www.qq.com",
    "custom_cell1": {
      "name": "使用入口2",
      "tips": "激活后显示",
      "url": "http://www.xxx.com"
    },
    "bonus_rule": {
      "cost_money_unit": 100,
      "increase_bonus": 1,
      "max_increase_bonus": 200,
      "init_increase_bonus": 10,
      "cost_bonus_unit": 5,
      "reduce_money": 100,
      "least_money_to_use_bonus": 1000,
      "max_reduce_bonus": 50
    },
    "discount": 10
  }
}


// WeChatCard.card.createCard(memberCardInfo)
//   .then(result => {
//     console.log('创建成功', result)

//     WeChatCard.memberCard.setTestWhiteList()
//   })
//   .catch(e => console.log('创建失败', e))
// WeChatCard.setConfig({
//   appId: 'wx66e59f0e402601f3',
//   appSecret: '184897070ca93a0e563cb6b79962a98c'
// })


// _config.getAccessToken().then(token => console.log(token))

// Demo数据，具体的字段含义，可以参加Wechat-Card的GITHUB或者官方文档

var shops = [{
  "business_name": "麦当劳",
  "branch_name": "赤岗店",
  "province": "广东省",
  "city": "广州市",
  "district": "海珠区",
  "address": "中国广东省广州市海珠区艺苑路 11 号",
  "telephone": "020-89772059",
  "category": "房产小区",
  "longitude": "115.32375",
  "latitude": "25.097486"
}, {
  "business_name": "麦当劳",
  "branch_name": "珠江店",
  "province": "广东省",
  "city": "广州市",
  "district": "海珠区",
  "address": "中国广东省广州市海珠区艺苑路 12 号",
  "telephone": "020-89772059",
  "category": "房产小区",
  "longitude": "113.32375",
  "latitude": "23.097486"
}];

WeChatCard.shop.batchGetShops(0 ,20)
  .then(list => console.log(list))
  .catch(e => console.log(e))

WeChatCard.delivery.paycell('1111111').then(success => console.log(success))