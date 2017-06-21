const request = require('../utils/request')
const config = require('../config')
const errors = require('../utils/errors')
const fs = require('fs')
const os = require('os')
const path = require('path')
const formstream = require('formstream')
const fetch = require('node-fetch')
const encrypt = require('../utils/encrypt')

/**
 * 开发者需调用该接口上传商户图标至微信服务器，获取相应logo_url/icon_list/image_url，用于卡券创建。
 * 开发者注意事项
 *    1.上传的图片限制文件大小限制1MB，仅支持JPG、PNG格式。
 *    2.调用接口获取图片url仅支持在微信相关业务下使用。
 * @param 
 */
exports.uploadimg = (filePath) => {
  return fetch(filePath).then(res => res.buffer())
    .then(data => {
      return request.postMedia(config.api.UPLOAD_IMG, {
        formData: {
          buffer: data,
          hack: ''
        }
      })
    })
}


/**
 * get wechat card colors (获取创建卡券允许使用的颜色列表)
 */
exports.getColorList = () => {
  return request.get(config.api.COLORS)
}
/**
 * 得到access_token
 */
exports.getAccessToken = () => {
  return config.getAccessToken()
}


/**
 * calculate signature (计算签名)
 * @param  {Array}   data     [The data to be encrypted 待加密数据]
 * @param  {Function} callback(error, signature)
 */
exports.getSignature = function (data) {
  if (!data instanceof Array) {
    return callback(error.MISSING_PARAMS());
  }
  var signatureStr = data.sort().join("");
  if (signatureStr === "") {
    return callback(error.SIGN_DATA_CANNOT_NULL());
  }
  return encrypt.sha1(signatureStr)
};

/**
 * 
 * code=1434008071，
 * timestamp=1404896688，
 * card_id=pjZ8Yt1XGILfi-FUsewpnnolGgZk， 
 * api_ticket=ojZ8YtyVyr30HheH3CM73y7h4jJE ，
 * nonce_str=123
 */
exports.getSignature_1 = function (data) {
  if (!data instanceof Array) {
    return callback(error.MISSING_PARAMS());
  }

  return config.getTicket('wx_card').then(ticket => { 
    data.push(ticket)
    let signatureStr =  data.sort().join('')
    if (signatureStr === "") {
      return errors.SIGN_DATA_CANNOT_NULL()
    }
    return encrypt.sha1(signatureStr)
  })
}