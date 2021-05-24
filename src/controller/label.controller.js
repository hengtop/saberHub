/**
 * Create by zhangheng on 2021/5/21
 */
const service = require('../service/label.service')
class LabelController {
  async create(ctx, next) {
    const labelName = ctx.request.body.name;
    const result = await service.create(labelName);
    ctx.body = result;
  }
  //获取标签列表
  async list(ctx, next) {
    const {limit, offset} = ctx.query;
    const result = await service.getLabels(limit, offset);
    ctx.body = result;
  }
}

module.exports = new LabelController();
