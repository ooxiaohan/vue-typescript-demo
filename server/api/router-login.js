/**
 * 实现完整等jwt模式登录及token和错误处理
 * 这里作为登录的最终流程所有异步函数没有执行next（）表示到这个方法之后的逻辑全部失效
 */

// 自定义服务器睡眠时间
const myDelay = require('../util').delay()
// 判断对象是否在数据库中
const isInDB = require('../util').isInDB()
// 引入jsonwebtoken实现token生成
const jwtCreate = require('jsonwebtoken')
// 引入jwt配置文件
const jwtConfig = require('../jwtConfig')
// 自定义jwt秘钥内容
const secretKey = jwtConfig.secretKey
// 自定义jwt过期时间
const expires = jwtConfig.expiresTime
// 模拟数据
const  users = require('../Database/user')

let login = async (ctx, next) => {
  // 获取post方式的传参
  let obj = ctx.request.body

  // 获取get方式的传参
  // let obj = ctx.request.query

  // 模拟网络延迟或者服务器繁忙
  await myDelay(5000).then(() => {
    // 实际的处理流程
    if (!obj) {
      ctx.status = 400
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>账号密码不能为空</h1>'
      return
    }

    if (isInDB(obj,users)) {
      ctx.response.type = 'application/json'
      // ctx.response.body = {'token': '123456'}
      // 使用jsonwebtoken生成真正的token 并且设置超时时间
      // 被加密部分 这个被加密部分在正式环境可以和数据库中作比较作为验证token是否真实的依据
      // {
      //   "iss": "John Wu JWT",
      //   "iat": 1441593502,
      //   "exp": 1441594722,
      //   "aud": "www.example.com",
      //   "sub": "jrocket@example.com",
      //   "from_user": "B",
      //   "target_user": "A"
      // }
      // iss: 该JWT的签发者
      // sub: 该JWT所面向的用户
      // aud: 接收该JWT的一方
      // exp(expires): 什么时候过期，这里是一个Unix时间戳
      // iat(issued at): 在什么时候签发的
      // 这里可以加入可访问路由 就不需要每次去数据库中查找了 或者添加用户身份
      const payload ={name: obj.name}


    } else {
      ctx.status = 401
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>账号或密码不正确</h1>'
    }
  })
}
// 导出模块格式要注意下 这个格式和controller中解析有关系 当前解析还不支持get 和post之外的请求
module.exports = {
  'GET /public/login': login
}