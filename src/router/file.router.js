/**
 * Create by zhangheng on 2021/5/23
 */
const Router = require('koa-router');

const fileRouter = new Router({prefix:'/upload'});
const {
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  avatarUpload,
  pictureUpload,
  pictureResize
} = require('../middleware/file.middleware')
const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller');
//上传头像
fileRouter.post('/avatar',verifyAuth, avatarUpload, saveAvatarInfo);
//上传配图
fileRouter.post('/picture', verifyAuth, pictureUpload, pictureResize, savePictureInfo);
module.exports = fileRouter;
