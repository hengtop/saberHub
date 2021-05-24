/**
 * Create by zhangheng on 2021/5/21
 */
const service = require('../service/label.service')
const verifyLabelExists = async (ctx, next) => {
  const {labels} = ctx.request.body;
  //判断标签是否存在,不存在就先创建
  const newLabels = [];//保存标签信息(已经添加好了)
  for(let name of labels) {
    //查询标签
    const result = await service.hasLabel(name);
    if(!result ) {
      //创建标签
      const result = await service.create(name);
      newLabels.push({id:result.insertId, name});
    } else {
      newLabels.push({id:result.id, name:result.name});
    }
  }
  ctx.newLabels = newLabels;
  await next();
}

module.exports = {
  verifyLabelExists
}
