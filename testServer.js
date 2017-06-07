const Koa = require('koa')
const xmlParser = require('koa-xml-body')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const api = require('./testEvent')

const app = new Koa()
    .use(cors())
    .use(xmlParser({
        xmlOptions: {
            explicitArray: false
        }
    }))
    .use(function (ctx, next) {
        // the parsed body will store in this.request.body
        // if nothing was parsed, body will be undefined
        ctx.body = ctx.request.body
        return next()
    })
    .use(bodyParser())
    .use(api.routes())

app.listen(3000, () => console.log('server is start : !!!!!'))