/**
 * Create by zhangheng on 2021/5/20
 */
const errorType = require('../constaints/errorType')
const checkParams = async (ctx,next) => {
  const {momentId} = ctx.request.query;
  if(!!!momentId) {
    const error = new Error(errorType.PARAMETER_ABSENT);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

module.exports = {
  checkParams
}
