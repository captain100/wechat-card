const errors = {
  REQUEST_ERROR: (err) => {
    return { code: 9001, msg: `request error: ${err}` }
  },
  MISSING_PARAMS: (err) => {
    err = err || ''
    return { code: 9002, msg: `参数错误 ${err}` }
  },
  ERROR_ACCESSTOKEN: () => {
    return { code: 9003, msg: '获取access_token错误' }
  },
  INTERFACE_ERROR: (err) => {
    return { code: err.errcode, msg: err.errmsg }
  },
  FILE_PATH_ERROR: (err) => {
    return { code: 9004, msg: `媒体文件地址错误：${err}`}
  }
}

module.exports = errors