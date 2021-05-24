/**
 * Create by zhangheng on 2021/5/19
 */
const service = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const {momentId, content} = ctx.request.body;
    const userId = ctx.user.id;
    const result = await service.create(momentId, content, userId);
    ctx.body = result;
  }

  //回复
  async reply(ctx, next) {
    const {momentId, content} = ctx.request.body;
    const {commentId} = ctx.request.params;
    const userId = ctx.user.id;
    const result = await service.create(momentId, content, userId, commentId);
    ctx.body = result;
  }

  //修改评论
  async update(ctx, next) {
    const {commentId} = ctx.request.params;
    const {content} = ctx.request.body;
    const result = await service.update(commentId, content);
    ctx.body = result;
  }

  //删除评论
  async remove(ctx, next) {
    const {commentId} = ctx.request.params;
    const result = await service.remove(commentId);
    ctx.body = result;
  }

  //获取评论列表
  async list(ctx, next) {
    const {momentId} = ctx.request.query;
    const result = await service.getCommentById(momentId)
    ctx.body = result;
  }
}

module.exports = new CommentController();
