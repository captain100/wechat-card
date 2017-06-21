const crypto = require('crypto')

exports.sha1 = (msg) => {
  const enc = crypto.createHash("sha1")
  enc.update(msg)
  return enc.digest("hex")
}