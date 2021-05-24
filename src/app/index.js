/**
 * Create by zhangheng on 2021/5/16
 */
const Koa = require('koa');
const bodyParse = require('koa-bodyparser');//解析json
/*const userRouter = require('../router/user.router');
const authRouter = require('../router/auth.router');*/
const routes = require('../router/index')
const handleError = require('../app/handleError')

const app = new Koa();
app.routes = routes;//这里对this隐式绑定了
app.use(bodyParse());
/*app.use(userRouter.routes());
app.use(userRouter.allowedMethods());//要求匹配方法
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());//要求匹配方法*/
app.routes();//调用该函数自动注册
//监听打印异常
app.on('error', handleError);

module.exports = app;
