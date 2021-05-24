/**
 * Create by zhangheng on 2021/5/16
 */
//错误处理
const errorType = require('../constaints/errorType');
const handleError = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.USERNAME_OR_PASSWORD_IS_REQUIRED:
      status = 500;
      message = "用户名或者密码不能为空";
      break;
    case errorType.USER_HAS_EXIST:
      status = 409;
      message = "用户名已经存在";
      break;
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户不存在";
      break;
    case errorType.PASSWORD_ERROR:
      status = 400;
      message = "用户名或者密码错误";
      break;
    case errorType.TOKEN_HAS_EXPIRED:
      status = 401;
      message = "token已经失效";
      break;
    case errorType.NOT_LOG_IN:
      status = 403;
      message = "未授权";
      break;
    case errorType.NOT_HAVE_PERMISSION:
      status = 403;
      message = "没有权限";
      break;
    case errorType.PARAMETER_ABSENT:
      status = 500;
      message = "参数异常";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = handleError;
