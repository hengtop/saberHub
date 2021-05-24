/**
 * Create by zhangheng on 2021/5/16
 */
const service = require('../service/user.service');
const fs = require('fs');
const {AVATAR_PATH} = require('../constaints/filePath')
class UserController {
  async create(ctx, next) {
    //处理用户参数
    const body = ctx.request.body;
    //查询数据库
    await service.create(body);
    const info = await service.getUserByName(body.username);
    //返回数据
    ctx.body = {
      code:200,
      user:info[0].username,
      message:'用户添加成功'
    };
  }
  async avatarInfo(ctx, next) {
    const {userId} = ctx.params;
    const result = await service.getUserAvatarInfoById(userId);
    //设置文件读取格式
    ctx.response.set('content-type', result.mimetype);
    //ctx.body 可以设置多种格式
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`);
  }
}
module.exports = new UserController();
