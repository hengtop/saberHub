/**
 * Create by zhangheng on 2021/5/23
 */
const service = require('../service/file.service');
const {APP_HOST, APP_PORT} = require('../app/config')
const userService = require('../service/user.service');

class FileController {
  //保存头像信息
  async saveAvatarInfo(ctx, next) {
    const {mimetype, filename, size} = ctx.req.file;
    const {id} = ctx.user;
    //写入数据库
    await service.createAvatarInfo(filename, mimetype, size, id);
    //将头像的url写入用户表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);
    ctx.body = "上传成功";
  }

  async savePictureInfo(ctx, next) {
    //保存所有的图片
    const {files} = ctx.req;
    const {id} = ctx.user;
    const {momentId} = ctx.query;
    for (const file of files) {
      const {filename, mimetype, size} = file;
      await service.createPictureInfo(filename, mimetype, size, id, momentId);
    }
    ctx.body = "xx"
  }
}

module.exports = new FileController();
