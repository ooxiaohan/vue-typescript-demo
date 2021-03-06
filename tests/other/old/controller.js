/**
 * 本文件是自定义一个中间件 用来遍历对应文件夹下面的所有接口定义
 * 参考 https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471133885340dad9058705804899b1cc2d0a10e7dc80000
 */
const fs = require('fs')

// 把请求路径和对应的处理方法意义映射到路由中
function addMapping (router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else if (url.startsWith('HEAD ')) {
      let path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: HEAD ${path}`)
    } else if (url.startsWith('PATCH ')) {
      let path = url.substring(6)
      router.post(path, mapping[url])
      console.log(`register URL mapping: PATCH ${path}`)
    } else if (url.startsWith('PUT ')) {
      let path = url.substring(4)
      router.post(path, mapping[url])
      console.log(`register URL mapping: PUT ${path}`)
    } else if (url.startsWith('DELETE ')) {
      let path = url.substring(7)
      router.post(path, mapping[url])
      console.log(`register URL mapping: DELETE ${path}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

// 读取api文件夹下所有js文件读取对应接口
function addControllers (router, dir) {
  let files = fs.readdirSync(__dirname + '/' + dir)
  let js_files = files.filter((f) => {
    return f.endsWith('.js')
  })

  for (let f of js_files) {
    console.log(`process controller: ${f}...`)
    let mapping = require(__dirname + '/' + dir + '/' + f)
    addMapping(router, mapping)
  }
}

module.exports = function (dir = 'api') {
  let
    controllers_dir = dir, // 如果不传参数，扫描目录默认为'api'
    router = require('koa-router')()
  addControllers(router, controllers_dir)
  // 返回路由可访问对象
  // return router.routes();
  // 返回路由完整对象
  return router
}