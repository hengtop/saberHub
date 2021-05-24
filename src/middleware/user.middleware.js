/**
 * Create by zhangheng on 2021/5/16
 */
//判断参数合法性
const errorType = require('../constaints/errorType');
const service = require('../service/user.service');
const md5Password = require('../utils/handlePassword')
//验证用户名或者密码填写是否正确
const verifyUser = async (ctx, next) => {
  const {username, password} = ctx.request.body;
  //判断用户名或者密码不为空
  if(!username || !password) {
    //处理错误信息
    const error = new Error(errorType.USERNAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  //判断是否被注册过
  const result = await service.getUserByName(username);
  if(result[0]) {//存在就返回错误
    const error = new Error(errorType.USER_HAS_EXIST);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}
//对密码进行加密
const encryption = async (ctx, next) => {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
}
module.exports = {
  verifyUser,
  encryption
}
