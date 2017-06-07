const KoaRouter = require('koa-router')
const WeChatCard = require('./index')

const api = new KoaRouter()
api.post('/', async (ctx, next) => {
  // the parsed body will store in this.request.body
  // if nothing was parsed, body will be undefined
  console.log(1111111)
  const xmlInfo = ctx.body

  WeChatCard.event(xmlInfo).then()

  ctx.status =200
})


module.exports = api

