const KoaRouter = require('koa-router')
const WeChatCard = require('./index')


const OAuth = require('wechat-oauth')



const api = new KoaRouter()
api.post('/', async (ctx, next) => {
  // the parsed body will store in this.request.body
  // if nothing was parsed, body will be undefined
  console.log(1111111)
  const xmlInfo = ctx.body

  WeChatCard.event(xmlInfo).then()

  ctx.status = 200
})

api.get('/oauth', async (ctx, next) => {
  let client = new OAuth('wx66e59f0e402601f3', '184897070ca93a0e563cb6b79962a98c', function (openid, callback) {
    console.log(openid)
  })

  let url = client.getAuthorizeURLForWebsite('redirectUrl');
  console.log(url)
})


api.get('/redirectUrl', async (ctx, next) => {
  console.log(11111)
})

  module.exports = api

