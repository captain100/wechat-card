var request = require("request");
var config = require("../config");
var error = require("./errors");

/**
 * 封装 post 请求方法
 * @param {string} api   api的url
 * @param {obj} options  请求的参数 
 */
exports.post = (api, options) => {
  return new Promise((resolve, reject) => {
    // 返回带有access_token 的请求地址
    return config.getUrl(api, (err, url) => {
      // get access token error
      if (err) {
        return reject(error.REQUEST_ERROR(err))
      }
      // console.log('请求地址 ：' + url)
      return request.post(url, options, (reqErr, res, body) => {
        // request error
        if (reqErr) {
          return reject(error.REQUEST_ERROR(reqErr));
        }
        const result = JSON.parse(body);
        // wechat interface error
        if (result.errcode != 0) {
          return reject(error.INTERFACE_ERROR(result));
        }
        return resolve(result);
      })
    })
  })
}

exports.get = (api) => {
  return new Promise((resolve, reject) => {
    config.getUrl(api, (err, url) => {
      // get access token error
      if (err) {
        return reject(err);
      }
      return request.get(url, (reqErr, res, body) => {

        // request error
        if (reqErr) {
          return reject(error.REQUEST_ERROR(err));
        }
        const result = JSON.parse(body);

        // wechat interface error
        if (result.errcode != 0) {
          return reject(error.INTERFACE_ERROR(result));
        }
        return resolve(result);
      });
    });
  })
};