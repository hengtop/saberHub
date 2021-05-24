/**
 * Create by zhangheng on 2021/5/17
 */
const jwt = require('jsonwebtoken');
const errorType = require('../constaints/errorType');
const service = require('../service/user.service');
const authService = require('../service/auth.service');
const md5Password = require('../utils/handlePassword');
const {PUBLIC_KEY} = require('../app/config')
const verifyLogin = async (ctx, next) => {
  const {username, password} = ctx.request.body;

  //判断密码是否为空
  if (!username || !password) {
    //处理错误信息
    const error = new Error(errorType.USERNAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  //判断是否存在
  const result = await service.getUserByName(username);
  if (!result[0]) {//不存在就返回错误
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  //判断密码是否正确
  if (md5Password(password) !== result[0].password) {
    const error = new Error(errorType.PASSWORD_ERROR);
    return ctx.app.emit('error', error, ctx);
  }
  ctx.user = result[0];//保存查询信息
  await next();
}

//验证是否登陆
const verifyAuth = async (ctx, next) => {
  //验证授权
  const {authorization} = ctx.headers;
  if (!authorization) {
    const error = new Error(errorType.NOT_LOG_IN);
    return ctx.app.emit('error', error, ctx);
  }
  const token = ctx.headers.authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]//验证算法
    });
    ctx.user = result;
  } catch (e) {
    const error = new Error(errorType.TOKEN_HAS_EXPIRED);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

//验证权限
const verifyPermission = async (ctx, next) => {
    //根据路由动态获取表名
    const [keys] = Object.keys(ctx.request.params);
    const resourceId = ctx.request.params[keys];
    const tableName = keys.replace("Id", "");
    const userId = ctx.user.id;
    const isPermission = await authService.checkResource(tableName, resourceId, userId);
    if (!isPermission) {
      const error = new Error(errorType.NOT_HAVE_PERMISSION);
      return ctx.app.emit('error', error, ctx);
    }
    await next();
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
