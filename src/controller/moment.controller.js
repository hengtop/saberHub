/**
 * Create by zhangheng on 2021/5/18
 */
const service = require('../service/moment.service');
const fileService = require('../service/file.service');
const {PICTURE_PATH} = require('../constaints/filePath');
const fs = require('fs');
class MomentController {
  async create(ctx, next) {
    //获取发表动态的用户id
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    //将内容添加到数据库中
    const result = await service.create(userId, content);
    ctx.body = result
  }

  //根据id查询动态
  async detail(ctx, next) {
    //获取数据id
    const {momentId} = ctx.request.params;
    const result = await service.getMomentById(momentId);
    ctx.body = result;
  }

  //分页查询
  async list(ctx, next) {
    const {offset, size} = ctx.query;
    const result = await service.getMomentList(offset, size);
    ctx.body = result;
  }

  //修改内容
  async update(ctx, next) {
    const {momentId} = ctx.request.params;
    const {content} = ctx.request.body;
    const result = await service.updateMomentById(content, momentId);
    ctx.body = result;
  }
  //删除动态
  async remove(ctx, next) {
    const {momentId} = ctx.request.params;
    const result = await service.removeMomentById(momentId);
    ctx.body = result;
  }
  //添加标签
  async addLabels(ctx, next) {
    const {momentId} = ctx.request.params;
    const labels = ctx.newLabels;
    //添加所有的标签
    for(let label of labels){
      const result = await service.hasLabel(momentId, label.id);
      if(!result) {//如果动态没有该标签
        //添加关系
        await service.addLabelForMoment(momentId, label.id);
      }
    }
    ctx.body=labels
  }
  //获取动态配图
  async pictureInfo(ctx, next) {
    const sizeArr = ["small", "middle", "large"];
    let {filename} = ctx.params;
    let {size} = ctx.query;
    //根据图片名称去查询数据表
    const pictureInfo = await fileService.getPictureByFilename(filename);
    //处理参数,展示不同尺寸的图片
    if(sizeArr.includes(size)){
      filename = filename+"-@"+size;
    }
    //设置文件类型
    ctx.response.set('content-type', pictureInfo.mimetype);
    ctx.body=fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
