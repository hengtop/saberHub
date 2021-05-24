/**
 * Create by zhangheng on 2021/5/16
 */
const Router = require('koa-router');
const {
  create,
  avatarInfo
} = require('../controller/user.controller');
const {
  verifyUser,
  encryption
} = require('../middleware/user.middleware')
const userRouter = new Router({prefix: '/users'});

userRouter.post('/', verifyUser, encryption, create);

//读取头像信息
userRouter.get('/:userId/avatar', avatarInfo);

module.exports = userRouter;
