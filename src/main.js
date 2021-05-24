/**
 * Create by zhangheng on 2021/5/16
 */
const app = require('./app/index');
require('./app/database');//测试数据库
const config = require('./app/config')

app.listen(config.APP_PORT, () => {
  console.log('端口'+config.APP_PORT+': 服务器启动成功');
})
