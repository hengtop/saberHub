/**
 * Create by zhangheng on 2021/5/17
 */
const { PRIVATE_KEY } = require('../app/config')
const jwt = require('jsonwebtoken');

class AuthController {
  async login(ctx, next) {
    const {id, username} = ctx.user;
    //颁发token
    const token = jwt.sign({id, username}, PRIVATE_KEY, {
      expiresIn:3600,//过期时间1h
      algorithm:'RS256'
    })
    ctx.body = {
      id,
      username,
      token
    };
  }

  async success(ctx, next) {
    //这里使用postman测试接口的时候可以写个脚本获取token添加到全局变量自动修改header中的token
    const {id, username} = ctx.user;
    ctx.body = {
      message:'授权成功',
      id,
      username
    }
  }
}

module.exports = new AuthController();
