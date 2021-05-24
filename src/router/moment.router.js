/**
 * Create by zhangheng on 2021/5/18
 */
const Router = require('koa-router');
const momentRouter = new Router({prefix: '/moment'});


const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  pictureInfo
} = require('../controller/moment.controller')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  verifyLabelExists
} = require('../middleware/label.middleware');
//添加动态
momentRouter.post('/', verifyAuth, create);
//获取某一条动态信息
momentRouter.get('/:momentId', detail);
//获取多条动态 根据offset和size
momentRouter.get('/', list);
//修改某一条内容
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
//删除某一条内容
momentRouter.delete('/:momentId',verifyAuth, verifyPermission, remove);
//给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);
//动态配图
momentRouter.get('/images/:filename', pictureInfo);

module.exports = momentRouter;
