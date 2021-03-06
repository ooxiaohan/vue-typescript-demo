// 自定义服务器睡眠时间
const myDelay = require('../delay')

let login = async (ctx, next) => {
  // 获取post方式的传参
  //let obj = ctx.request.body
  // 获取get方式的传参
  let obj = ctx.request.query
  // 模拟网络延迟或者服务器繁忙
  await myDelay(5000).then(() => {
    console.log('实际处理流程')
    // 实际的处理流程
    if (!obj) {
      ctx.status = 400
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>账号密码不能为空</h1>'
      next()
      return
    }

    if (obj.name == 'admin' && obj.password == '123456') {
      ctx.response.type = 'application/json'
      ctx.response.body = {'token': '123456'}
      next()
    } else {
      ctx.status = 401
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>账号或密码不正确</h1>'
      next()
    }
  })
}
// 导出模块格式要注意下 这个格式和controller中解析有关系 当前解析还不支持get 和post之外的请求
module.exports = {
  'GET /public/login': login
}