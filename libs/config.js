// 引入请求
const request = require('request')
// const Promise = require('promise')
const fetch = require('node-fetch')
const errors = require('./utils/errors')

// 封装请求微信接口
const api = {
  // BASIC
  ACCESS_TOKEN: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
  API_TICKET: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
  // open weixin 
  CREATE_CARD: 'https://api.weixin.qq.com/card/create',
  GET_CARD_CODE: 'https://api.weixin.qq.com/card/code/get'
}

// 单个应用配置
let config = {
  _token: true
}

// 私有配置
let privateConfig = {
  access_token: {},
  jsapi_ticket: {}
}

const getConfig = () => {
  return config
}

/**
 * 设置公众账号的 appid appSecret 
 * 三方授权 appid appSecret ticket 
 * @param {*} newConfig 
 */
const setConfig = (newConfig) => {
  const { appId = null, appSecret = null, accessTokenService = null, ticketValue = null } = newConfig
  // 微信开放平台三方 config 文件
  if (appId && appSecret && ticketValue) {
    Object.assign(config, { appId, appSecret, ticketValue })
  }
  // 公众号的配置文件
  else if (appId && appSecret) {
    Object.assign(config, { appId, appSecret })
  }
  // 来之第三方平台的 access_token
  else if (accessTokenService) {
    Object.assign(config, { accessTokenService, _token: false })
  } else {
    throw new Error("setConfig is error")
  }
}

const setPrivateConfig = (key, value) => {
  if (typeof key == "string") {
    privateConfig[key] = value
  }
}

/**
 * check the token is expire or not (检查token是否过期)
 * @param {string} type [access_token or jsapi_ticket]
 * @param {number} expireTime  
 * @return {Boolean} 
 */
const isNotExpire = (type, expireTime) => {
  const op = privateConfig[type]
  if (Date.now() - op.expireTime > (expireTime || 360000)) {
    return false
  }
  return true
}


/**
 * 得到accessToken
 * @return {promise}
 */
const getAccessToken = () => {
  // 最终返回promise 对象
  const returnsFunc = (body, isNew) => {
    const token = (typeof body === 'string') ? JSON.parse(body).access_token : body.access_token
    if (isNew) {
      setPrivateConfig("access_token", { cred: token, expireTime: Date.now() })
    }

    return token
  }
  // get access_token from wechat server or 第三方平台
  if (config._token) {
    if (privateConfig.access_token.cred && isNotExpire("access_token")) {
      return returnsFunc({ access_token: privateConfig.config.cred }, false)
    }
    let accessTokenUrl = `${api.ACCESS_TOKEN}&appid=${config.appId}&secret=${config.appSecret}`
    return new Promise((resolve, reject) => {
      var options = {
        uri: accessTokenUrl,
        method: 'GET'
      };
      request(options, function (error, response, body) {
        if (error) {
          return reject(error)
        }

        return resolve(returnsFunc(body, true))
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      if (!config.accessTokenService) {
        return reject(errors.ERROR_ACCESSTOKEN())
      }
      return resolve(returnsFunc(config.accessTokenService, false))
    })
  }
}


/**
 * 带着access_token 去请求数据
 * @param {*} url 
 * @param {*} callback 
 */
const formatUrl = (url, callback) => {
  return getAccessToken().then(token => callback(null, `${url}?access_token=${token}`))
    .catch(e => callback(err))
}

/**
 * get ticket
 * @param {String} type 
 * @return {}
 */
const getTicket = (type) => {
  // 最终返回promise 对象
  const returnsFunc = (body, isNew) => {
    const token = (typeof body === 'string') ? JSON.parse(body).ticket : body.ticket
    if (isNew) {
      setPrivateConfig(type + '_ticket', { cred: token, expireTime: Date.now() })
    }
    return Promise.resolve(ticket)
  }

  // get ticket if not expire
  if (privateConfig.jsapi_ticket.cred && isNotExpire(type + "_ticket", 7200000)) {
    return returnsFunc({ ticket: privateConfig.jsapi_ticket.cred }, false)
  }

  // request jsapi ticket if it expired
  formatUrl(api.API_TICKET, function (err, url) {
    if (err) { return Promise.reject(err); }
    return request.get(url + "&type=" + type, function (err, res, body) {
      if (err) {
        return Promise.reject(err)
      }
      returnsFunc(body, true)
    });
  });
}

module.exports = {
  api,
  getConfig,
  setConfig,
  getUrl: formatUrl,
  getTicket,
  getAccessToken,
}