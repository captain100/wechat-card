const request = require('../utils/request')
const config = require('../config')
const errors = require('../utils/errors')
const fs = require('fs')
const path = require('path')
const formstream = require('formstream')

/**
 * 开发者需调用该接口上传商户图标至微信服务器，获取相应logo_url/icon_list/image_url，用于卡券创建。
 * 开发者注意事项
 *    1.上传的图片限制文件大小限制1MB，仅支持JPG、PNG格式。
 *    2.调用接口获取图片url仅支持在微信相关业务下使用。
 * @param 
 */
exports.uploadimg = (filepath) => {
  return request.postMedia(config.api.UPLOAD_IMG, {
    formData: {
      buffer: fs.createReadStream(path.basename(filepath))
    }
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
