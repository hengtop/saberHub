/**
 * Create by zhangheng on 2021/5/17
 */
const fs = require('fs');
//自动注册路由
const routers = function() {
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());//要求匹配方法
  })
}

module.exports = routers;

