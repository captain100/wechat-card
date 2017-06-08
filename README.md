### 封装微信卡券功能
=================
> 开发初中：微信小程序中需要使用卡券的功能，需要对微信卡券功能进行封装整理


[![NPM](https://nodei.co/npm/wechat-cards.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/wechat-cards/)


[TOC]

微信卡券API接口NODEJS版

> 目前版本仅支持以下几种类型的卡券: `CASH`, `GIFT`, `GROUPON`, `DISCOUNT`, `GENERAL_COUPON`,    `MEMBER_CARD` 

我们会在之后的版本陆续推出这些功能的支持。

[![npm](https://img.shields.io/npm/v/wechat-cards.svg)]()
[![npm](https://img.shields.io/npm/dm/wechat-cards.svg)]()



#### 安装
```
  npm install wechat-cards
```


#### 使用方法
```javascript
  import wechatcard from 'wechat-cards'

  // 初试化设置
  WeChatCard.setConfig({
    appId: 'wx577c00556617b6e6',
    appSecret: 'e7578f5d676a280fda1925b077968505'
  })

  // 三方授权 access_token
  WeChatCard.setConfig({
    accessTokenService: {
      "access_token": "yLI3kxxjO_VMtpHzuWt9veMdizk5Tai1xpyVG8YTAySPWhbuova8RsHTuKAKENdjqVOHfCWdx_E-utxBu0R4l2AlbxGlamRWRXawysELO4l_kc_ZmxSCB0oroQSiyKRYUUOfAAAPPJ",
      "expires_in": 7199
    }
  })

  let cardinfo = {...}

  // 创建卡券
  WeChatCard.card.createCard(cardinfo)
    .then(success => console.log('创建卡券成功', success))
    .catch(e => console.log('创建卡券失败', e))
  ```

#### 文档
  1. [卡券管理](./doc/card.md)
  2. 投放卡券
  3. 核销卡券
  4. 基础功能
